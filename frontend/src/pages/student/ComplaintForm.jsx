import { useState } from "react";
import { Link } from "react-router-dom";

function ComplaintForm() {
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setSuccess(true);

    setFormData({
      title: "",
      category: "",
      location: "",
      description: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background:
          "linear-gradient(135deg,#eef6ff,#f5f3ff,#ecfeff)",
      }}
    >
      <div className="container">

        <Link
          to="/student/dashboard"
          className="btn btn-dark rounded-pill px-4 mb-4 shadow"
        >
          ← Back to Dashboard
        </Link>

        {success && (
          <div
            className="alert alert-success border-0 shadow-lg rounded-4"
            role="alert"
          >
            ✅ Complaint submitted successfully!
          </div>
        )}

        <div
          className="card border-0 shadow-lg rounded-4 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="card-header border-0 py-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
            }}
          >
            <h2 className="text-white mb-0 fw-bold">
              Submit Complaint
            </h2>
          </div>

          <div className="card-body p-4 p-md-5">

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Complaint Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  className="form-control form-control-lg rounded-4"
                  placeholder="Enter complaint title"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  className="form-select form-select-lg rounded-4"
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Category
                  </option>
                  <option>Classroom</option>
                  <option>Laboratory</option>
                  <option>Hostel</option>
                  <option>Library</option>
                  <option>Internet/Wi-Fi</option>
                  <option>Electrical</option>
                  <option>Water Supply</option>
                  <option>Cleanliness</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  className="form-control form-control-lg rounded-4"
                  placeholder="Enter location"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  rows="6"
                  name="description"
                  value={formData.description}
                  className="form-control form-control-lg rounded-4"
                  placeholder="Describe the issue in detail..."
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 py-3 text-white fw-bold rounded-4 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  border: "none",
                  fontSize: "18px",
                }}
              >
                 Submit Complaint
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;

