import React from 'react';
import '../styles/components/modal.css';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Agregar Movimiento</h2>
        <form>
          <input type="text" placeholder="Descripción" required />
          <input type="number" placeholder="Monto" required />
          <select>
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
          <button type="submit">Guardar</button>
        </form>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
