import { useState } from "react";
import Table from "./Table";

function App() {
	const [text, setText] = useState("");
	const [types, setTypes] = useState([]);
	const [activeTypes, setActiveTypes] = useState([]);
	const [tiers, setTiers] = useState([]);
	const [activeTiers, setActiveTiers] = useState([]);
	const [socials, setSocials] = useState([]);
	const [activeSocials, setActiveSocials] = useState([]);
	const handleChange = (e, type) => {
		const { name } = e.target;
		const callback = (prev) => {
			if (e.target.checked) {
				return [...prev, name];
			} else {
				return prev.filter((newName) => newName != name);
			}
		};
		if (type === "type") {
			setActiveTypes(callback);
		}
		if (type === "tier") {
			setActiveTiers(callback);
		}
		if (type === "socials") {
			setActiveSocials(callback);
		}
	};

	const typeCheckBox = types.map((el) => {
		return (
			<div>
				<label htmlFor={el}>{el}</label>
				<input onChange={(e) => handleChange(e, "type")} id={el} name={el} type="checkbox" />
			</div>
		);
	});

	const tierCheckBox = tiers.map((el) => {
		return (
			<div>
				<label htmlFor={el}>{el}</label>
				<input onChange={(e) => handleChange(e, "tier")} id={el} name={el} type="checkbox" />
			</div>
		);
	});

	const socialsCheckBox = socials.map((el) => {
		return (
			<div>
				<label htmlFor={el}>{el}</label>
				<input onChange={(e) => handleChange(e, "socials")} id={el} name={el} type="checkbox" />
			</div>
		);
	});

	return (
		<>
			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
			<div className="wrapper">
				<div>
					<div>TYPES</div>
					{typeCheckBox}
				</div>
				<div>
					<div>TIER</div>
					{tierCheckBox}
				</div>
				<div>
					<div>SOCIALS</div>
					{socialsCheckBox}
				</div>
			</div>
			<Table
				input={text}
				setTypes={setTypes}
				activeTypes={activeTypes}
				setTiers={setTiers}
				activeTiers={activeTiers}
				setSocials={setSocials}
				activeSocials={activeSocials}
			/>
		</>
	);
}

export default App;
