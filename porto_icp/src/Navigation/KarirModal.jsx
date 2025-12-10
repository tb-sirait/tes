import React, { useState } from "react";
import "./karirmodal.css";

function KarirModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("Semua");
  const [expandedJobs, setExpandedJobs] = useState([]);

  const jobData = [
    {
      id: 1,
      title: "Administrator (Accurate)",
      field: "Financial",
      employmentType: "Tetap",
      requirements: [
        "Minimal pendidikan D3/S1 Akuntansi",
        "Menguasai software Accurate",
        "Pengalaman minimal 1 tahun",
        "Teliti dan detail oriented",
        "Mampu bekerja dalam tim",
      ],
    },
    {
      id: 2,
      title: "Telemarketing",
      field: "Marketing",
      employmentType: "Kontrak",
      requirements: [
        "Minimal pendidikan SMA/SMK",
        "Memiliki kemampuan komunikasi yang baik",
        "Target oriented",
        "Pengalaman di bidang sales/telemarketing",
        "Mampu bekerja dengan target",
      ],
    },
    {
      id: 3,
      title: "Digital Marketing (Designer req Canva)",
      field: "IT",
      employmentType: "Tetap",
      requirements: [
        "Minimal pendidikan D3/S1 Desain Grafis/Marketing",
        "Menguasai Canva dan tools desain lainnya",
        "Memahami strategi digital marketing",
        "Kreatif dan up-to-date dengan tren",
        "Pengalaman minimal 1 tahun",
      ],
    },
    {
      id: 4,
      title: "IT Support (Hardware & Software)",
      field: "IT",
      employmentType: "Tetap",
      requirements: [
        "Minimal pendidikan D3/S1 Teknik Informatika",
        "Menguasai troubleshooting hardware dan software",
        "Memahami jaringan komputer",
        "Mampu bekerja di bawah tekanan",
        "Sertifikasi IT menjadi nilai tambah",
      ],
    },
    {
      id: 5,
      title: "Admin Gudang",
      field: "Gudang",
      employmentType: "Kontrak",
      requirements: [
        "Minimal pendidikan SMA/SMK",
        "Memahami sistem inventory",
        "Teliti dan terorganisir",
        "Mampu mengoperasikan komputer",
        "Pengalaman di bidang warehouse",
      ],
    },
  ];

  const fields = ["Semua", "Financial", "Marketing", "IT", "Gudang"];

  const filteredJobs = jobData.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesField =
      selectedField === "Semua" || job.field === selectedField;
    return matchesSearch && matchesField;
  });

  const toggleJob = (jobId) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const handleSendApplication = (jobTitle) => {
    const message = `Halo, saya tertarik untuk melamar posisi ${jobTitle} di PT Infoduta Computindo Perkasa`;
    const whatsappUrl = `https://wa.me/6285545031039?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="career-modal-overlay" onClick={onClose}>
      <div
        className="career-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="career-modal-header">
          <h2 className="career-modal-title">Lowongan Karir</h2>
          <button className="career-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="career-modal-content">
          <div className="career-modal-filters">
            <div className="career-search-box">
              <svg
                className="career-search-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Cari posisi..."
                className="career-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="career-field-filters">
              {fields.map((field) => (
                <button
                  key={field}
                  className={`career-field-btn ${selectedField === field ? "active" : ""}`}
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          <div className="career-job-list">
            {filteredJobs.length === 0 ? (
              <div className="career-no-results">
                <p>Tidak ada lowongan yang sesuai dengan pencarian Anda</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="career-job-card">
                  <div
                    className="career-job-header"
                    onClick={() => toggleJob(job.id)}
                  >
                    <div className="career-job-info">
                      <h3 className="career-job-title">{job.title}</h3>
                      <div className="career-job-meta">
                        <span className="career-job-field">{job.field}</span>
                        <span className="career-job-type">
                          {job.employmentType}
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`career-expand-icon ${expandedJobs.includes(job.id) ? "expanded" : ""}`}
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {expandedJobs.includes(job.id) && (
                    <div className="career-job-details">
                      <h4 className="career-requirements-title">
                        Persyaratan:
                      </h4>
                      <ul className="career-requirements-list">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                      <button
                        className="career-apply-btn"
                        onClick={() => handleSendApplication(job.title)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                        </svg>
                        Kirim CV & Surat Lamaran
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KarirModal;
