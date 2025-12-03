import React from "react";
import "./saleswhatsapp.css";

const SalesModal = ({ isOpen, onClose }) => {
  const salesContacts = [
    {
      id: 1,
      name: "Gunawan",
      role: "Sales 5",
      phone: "+62 823-1004-7775",
      specialty:
        "sales.5@infoduta.com",
    },
    {
      id: 2,
      name: "Ina",
      role: "Sales 2",
      phone: "+62 877-6138-1114",
      specialty:
        "sales.2@infoduta.com",
    },
    {
      id: 3,
      name: "Fitri",
      role: "Sales 8",
      phone: "+62 855-4503-1039",
      specialty:
        "sales.8@infoduta.com",
    },
    {
      id: 4,
      name: "Dewi",
      role: "Marketing/Sales",
      phone: "+62 897-5808-407",
      specialty:
        "dewi.handayani@infoduta.com",
    },
  ];

  if (!isOpen) return null;

  const handleWhatsAppClick = (phone) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone}`, "_blank");
  };

  return (
    <div className="sales-wa-modal-overlay" onClick={onClose}>
      <div
        className="sales-wa-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sales-wa-modal-close" onClick={onClose}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="sales-wa-modal-header">
          <div className="sales-wa-modal-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
            </svg>
          </div>
          <h2>Hubungi Tim Sales Kami</h2>
          <p>Berikut daftar Sales/Marketing dari Perusahaan Kami:</p>
        </div>

        <div className="sales-grid">
          {salesContacts.map((sales) => (
            <div key={sales.id} className="sales-card">
              <div className="sales-avatar">
                <span>
                  {sales.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="sales-info">
                <h3>{sales.name}</h3>
                <p className="sales-role">{sales.role}</p>
                <p className="sales-specialty">{sales.specialty}</p>
              </div>
              <button
                className="whatsapp-button"
                onClick={() => handleWhatsAppClick(sales.phone)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                </svg>
                Chat via WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesModal;
