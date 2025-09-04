
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  getVehicleTypes,
  getVehicleModels,
  submitBooking,
} from "../api"; 

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wheels, setWheels] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (wheels) {
      getVehicleTypes(wheels)
        .then(setTypes)
        .catch((err) => {
          console.error(err);
          setTypes([]);
        });

      setSelectedType(null);
      setVehicles([]);
      setSelectedVehicle(null);
    }
  }, [wheels]);

  // Step 3 → fetch vehicles when type changes
  useEffect(() => {
    if (selectedType) {
      getVehicleModels(selectedType)
        .then(setVehicles)
        .catch((err) => {
          console.error(err);
          setVehicles([]);
        });

      setSelectedVehicle(null);
    }
  }, [selectedType]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // Final submission
  const submit = async () => {
    setError("");

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      vehicleId: selectedVehicle,
      startDate: range[0].startDate.toISOString().slice(0, 10),
      endDate: range[0].endDate.toISOString().slice(0, 10),
    };

    try {
      await submitBooking(payload);
      alert("Booking successful!");

      // reset everything
      setStep(0);
      setFirstName("");
      setLastName("");
      setWheels(null);
      setTypes([]);
      setSelectedType(null);
      setVehicles([]);
      setSelectedVehicle(null);
    } catch (err) {
      console.error(err);
      setError("Network error or submission failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Vehicle Booking Wizard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {step === 0 && (
        <div>
          <h3>Step 1: Enter Name</h3>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button
            onClick={next}
            disabled={!firstName.trim() || !lastName.trim()}
          >
            Next
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3>Step 2: Select Wheels</h3>
          <button onClick={() => setWheels(2)}>2-Wheeler</button>
          <button onClick={() => setWheels(4)}>4-Wheeler</button>
          <br />
          <button onClick={back}>Back</button>
          <button onClick={next} disabled={!wheels}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Step 3: Select Vehicle Type</h3>
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              style={{
                background: selectedType === t.id ? "lightblue" : "white",
              }}
            >
              {t.name}
            </button>
          ))}
          <br />
          <button onClick={back}>Back</button>
          <button onClick={next}>
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 4: Select Vehicle Model</h3>
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVehicle(v.id)}
              style={{
                background: selectedVehicle === v.id ? "lightgreen" : "white",
              }}
            >
              {v.name}
            </button>
          ))}
          <br />
          <button onClick={back}>Back</button>
          <button onClick={next}>
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Step 5: Select Date Range</h3>
          <DateRange
            editableDateInputs
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
          <br />
          <button onClick={back}>Back</button>
          <button onClick={submit}>Submit</button>
        </div>
      )}
    </div>
  );
}
