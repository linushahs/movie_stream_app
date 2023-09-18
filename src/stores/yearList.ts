export interface Year {
  id: string;
  checked: boolean;
}

let years: Array<Year> = [];

for (let i = 23; i >= 0; i--) {
  years.push({ id: `20${i}`, checked: false });
}

years = [
  ...years,
  { id: "1990s", checked: false },
  { id: "1980s", checked: false },
];

export default years;
