function BloodRequest() {
  return (
    <div className="login">
      <h1>Blood Request</h1>

      <input type="text" placeholder="Requester Name" />
      <input type="text" placeholder="Phone Number" />
      <input type="email" placeholder="Email" />

      <input type="text" placeholder="Blood Group" />
      <input type="text" placeholder="District" />
      <input type="text" placeholder="Hospital Name" />
      <input type="text" placeholder="Patient Name" />
      <input type="number" placeholder="Patient Age" />
      <input type="number" placeholder="Units Needed" />

      <button>Submit Request</button>
    </div>
  );
}

export default BloodRequest;