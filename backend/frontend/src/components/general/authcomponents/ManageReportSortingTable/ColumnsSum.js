import { ColumnFilter } from "./ColumnFilter";

export const COLUMNSSUM = [
	{
		Header: "סוג אירוע",
		Footer: "סוג אירוע",
		accessor: "typevent",
		Filter: ColumnFilter,
	},
	{
		Header: "פירוט אירוע",
		Footer: "פירוט אירוע",
		accessor: "pirot",
		Filter: ColumnFilter,
	},
	{
		Header: "פיקוד",
		Footer: "פיקוד",
		accessor: "pikodrep",
		Filter: ColumnFilter,
	},
	{
		Header: "אוגדה",
		Footer: "אוגדה",
		accessor: "ogdarep",
		Filter: ColumnFilter,
	},
	{
		Header: "חטיבה",
		Footer: "חטיבה",
		accessor: "hativarep",
		Filter: ColumnFilter,
	},
	{
		Header: "גדוד",
		Footer: "גדוד",
		accessor: "gdodrep",
		Filter: ColumnFilter,
	},
	{
		Header: "תאריך הדיווח",
		Footer: "תאריך הדיווח",
		accessor: "createdAt",
		Filter: ColumnFilter,
	},
	{
		Header: "תאריך אירוע",
		Footer: "תאריך אירוע",
		accessor: "datevent",
		Filter: ColumnFilter,
	},
	{
		Header: "ימים מהדיווח",
		Footer: "ימים מהדיווח",
		accessor: "difftime",
		Filter: ColumnFilter,
	},
	{
		Header: "נדרש המשך טיפול",
		Footer: "נדרש המשך טיפול",
		accessor: "tipul",
		Filter: ColumnFilter,
	},

	// {
	//     Header: 'הרשאה',
	//     Footer:'הרשאה',
	//     accessor:'role',
	//     Filter:ColumnFilter
	// },
	// {
	//     Header: 'נוצר בתאריך',
	//     Footer:'נוצר בתאריך',
	//     accessor:'createdAt',
	//     Filter:ColumnFilter

	// },
	// {
	//     Header: 'עודכן בתאריך',
	//     Footer:'עודכן בתאריך',
	//     accessor:'updatedAt',
	//     Filter:ColumnFilter

	// }
];
