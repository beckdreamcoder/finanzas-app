import React, { useEffect, useState } from "react";
import '../styles/components/movimiento.css';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface Movement {
  id: number;
  type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Movimiento = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [filtered, setFiltered] = useState<Movement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Movement>>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [type, setType] = useState<"income" | "expense">("income");

  const categoryOptions = {
    income: ["salario", "freelance", "inversion", "venta", "regalo", "otro"],
    expense: ["alimentacion", "transporte", "salud", "entretenimiento", "servicios", "compras", "educacion", "otro"],
  };

  useEffect(() => {
    const saved = localStorage.getItem("movements");
    if (saved) {
      const data = JSON.parse(saved);
      setMovements(data);
      setFiltered(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movements", JSON.stringify(movements));
    setFiltered(movements);
  }, [movements]);

  const handleOpenModal = () => {
    setForm({});
    setEditingIndex(null);
    setModalOpen(true);
  };

  const handleEdit = (index: number) => {
    const item = movements[index];
    setForm(item);
    setType(item.type);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const newList = [...movements];
    newList.splice(index, 1);
    setMovements(newList);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Movement = {
      id: editingIndex !== null ? movements[editingIndex].id : Date.now(),
      type,
      description: form.description!,
      amount: form.amount!,
      category: form.category!,
      date: form.date!,
    };

    const updated = editingIndex !== null
      ? movements.map((m, i) => (i === editingIndex ? newItem : m))
      : [newItem, ...movements];

    setMovements(updated);
    setModalOpen(false);
  };

  const filterMovements = (term: string) => {
    const lower = term.toLowerCase();
    const filtered = movements.filter(
      (m) => m.description.toLowerCase().includes(lower) || m.category.toLowerCase().includes(lower)
    );
    setFiltered(filtered);
  };

  const totals = {
    income: movements.filter(m => m.type === "income").reduce((acc, m) => acc + m.amount, 0),
    expense: movements.filter(m => m.type === "expense").reduce((acc, m) => acc + m.amount, 0),
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="header">
          <h1 className="welcome">Movimientos Recientes</h1>
          <div className="header-actions">
            <div className="search-bar">
              <input type="text" placeholder="Buscar movimientos..." onChange={(e) => filterMovements(e.target.value)} />
            </div>
            <button className="filter-btn" onClick={() => alert("Próximamente filtros avanzados")}>Filtros ⬇</button>
          </div>
        </div>

        <div className="balance-summary">
          <div className="balance-card total">
            <div className="balance-label">Balance Total</div>
            <div className="balance-amount">S/ {(totals.income - totals.expense).toLocaleString()}</div>
          </div>
          <div className="balance-card income">
            <div className="balance-label">Ingresos</div>
            <div className="balance-amount">S/ {totals.income.toLocaleString()}</div>
          </div>
          <div className="balance-card expense">
            <div className="balance-label">Gastos</div>
            <div className="balance-amount">S/ {totals.expense.toLocaleString()}</div>
          </div>
        </div>

        <div className="movements-section">
          <div className="section-header">
            <h2 className="section-title">Todos los Movimientos</h2>
            <button className="add-btn" onClick={handleOpenModal}>+ Agregar Movimiento</button>
          </div>
          <div id="movementsList">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="icon">💳</div>
                <p>No hay movimientos registrados</p>
              </div>
            ) : (
              filtered.map((m, index) => (
                <div className="movement-item" key={m.id}>
                  <div className={`movement-icon ${m.type}`}>{m.type === "income" ? "💰" : "💸"}</div>
                  <div className="movement-details">
                    <div className="movement-name">{m.description}</div>
                    <div className="movement-category">{m.category}</div>
                    <div className="movement-date">{new Date(m.date).toLocaleDateString()}</div>
                  </div>
                  <div className={`movement-amount ${m.type}`}>
                    {m.type === "income" ? "+" : "-"} S/ {m.amount.toLocaleString()}
                  </div>
                  <div style={{ marginLeft: "15px", display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEdit(index)}>✏️</button>
                    <button onClick={() => handleDelete(index)}>🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {modalOpen && (
        <div className="modal active" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="title-section">
                <div className="icon">💳</div>
                <h3 className="modal-title">{editingIndex !== null ? "Editar Movimiento" : "Nuevo Movimiento"}</h3>
              </div>
              <button className="close-btn" onClick={() => setModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="type-toggle">
                <button type="button" className={type === "income" ? "active" : ""} onClick={() => setType("income")}>Ingreso</button>
                <button type="button" className={type === "expense" ? "active" : ""} onClick={() => setType("expense")}>Gasto</button>
              </div>

              <div className="form-group">
                <label className="form-label">Descripción</label>
                <input className="form-input" name="description" value={form.description || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Monto</label>
                <input className="form-input" type="number" name="amount" value={form.amount || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Categoría</label>
                <select className="form-select" name="category" value={form.category || ""} onChange={handleChange} required>
                  <option value="">Seleccionar categoría</option>
                  {categoryOptions[type].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Fecha</label>
                <input className="form-input" type="date" name="date" value={form.date || ""} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary">Guardar Movimiento</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movimiento;
