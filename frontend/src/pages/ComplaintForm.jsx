function ComplaintForm() {
  return (
    <div>
      <h2>Submit Complaint</h2>

      <form>
        <input type="text" placeholder="Complaint Title" />
        <br /><br />

        <select>
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

        <br /><br />

        <textarea
          placeholder="Complaint Description"
          rows="5"
          cols="40"
        ></textarea>

        <br /><br />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default ComplaintForm;