import React from "react";
import { useMemo, useDeferredValue } from "react";
import datas from "../data/res_templates.json";
import TD from "./TD";

const Table = ({ input, setTypes, activeTypes, setTiers, activeTiers, activeSocials, setSocials }) => {
	const defferedInput = useDeferredValue(input);
	const defferedVal = useDeferredValue(activeTypes);
	const defferedTier = useDeferredValue(activeTiers);
	const defferedSocials = useDeferredValue(activeSocials);

	const data = useMemo(() => {
		return datas.filter((el) => {
			let cond = false || defferedSocials.length === 0;
			const firstCond = el.Name.toLowerCase().includes(defferedInput);
			const secondCond = defferedVal.includes(el.type) || defferedVal.length === 0;
			const thirdCond = defferedTier.includes(el.Tier) || defferedTier.length === 0;
			const keys = Object.keys(el.social);
			defferedSocials.forEach((els) => {
				if (keys.includes(els)) {
					cond = true;
				}
			});

			return firstCond && secondCond && thirdCond && cond;
		});
	}, [defferedInput, defferedVal, defferedTier, defferedSocials]);

	const tableRowsAndTableHeads = useMemo(() => {
		let tableRows;
		let tableHeads;
		if (data.length > 0) {
			const headkeys = Object.keys(data?.[0]);
			tableHeads = headkeys.map((key) => <th>{key}</th>);
			tableRows = data.map((el) => {
				const tableDataValues = Object.entries(el);
				const tableData = tableDataValues.map(([key, val]) => {
					if (key === "type") {
						setTypes((prev) => {
							if (!prev.includes(val)) {
								return [...prev, val];
							}
							return prev;
						});
					}
					if (key === "Tier") {
						if (val) {
							setTiers((prev) => {
								if (!prev.includes(val)) {
									return [...prev, val].sort();
								}
								return prev;
							});
						}
					}
					if (typeof val === "object" && val !== null)
						return <TD val={val} setSocials={setSocials} />;
					return <td>{val}</td>;
				});

				return <tr>{tableData}</tr>;
			});
		}
		return { tableRows, tableHeads };
	}, [data]);

	return (
		<table>
			<thead>{tableRowsAndTableHeads.tableHeads}</thead>
			<tbody>{tableRowsAndTableHeads.tableRows}</tbody>
		</table>
	);
};

export default Table;
