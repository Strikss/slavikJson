import { useState } from "react";
import React from "react";

const TD = ({ val, setSocials }) => {
	const [folded, setFolded] = useState(true);
	const isArray = Array.isArray(val);
	const shouldShow = isArray ? val.length : Object.keys(val).length;

	return (
		<td>
			<button onClick={() => setFolded(!folded)}>
				{shouldShow ? `open ${isArray ? val.length : Object.keys(val).length}` : ""}
			</button>
			<td className={`${folded ? "folded" : ""}`}>{checkIfObject(val, setSocials)}</td>
		</td>
	);
};

export default TD;

function checkIfObject(val, setSocials) {
	if (Array.isArray(val)) {
		return val.map((el) => {
			const objEntries = Object.entries(el);
			return (
				<tr style={{ borderBottom: "1px solid red" }}>
					{objEntries.map(([key, value]) => {
						return (
							<tr>
								<td>
									<span>{key}</span>: {value}
								</td>
							</tr>
						);
					})}
				</tr>
			);
		});
	} else {
		const objEntries = Object.entries(val);
		return objEntries.map(([key, value]) => {
			setSocials((prev) => {
				if (!prev.includes(key)) {
					return [...prev, key];
				}
				return prev;
			});
			return (
				<tr>
					<td>
						<span>{key}</span>: {value}
					</td>
				</tr>
			);
		});
	}
}
