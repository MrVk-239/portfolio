export interface Education {
  institution: string;
  degree: string;
  field?: string;
  board?: string;
  startYear?: number;
  endYear?: number;
  year?: number;
  cgpa?: number;
  percentage?: number;
  location: string;
}

export const education: Education[] = [
  {
    institution: "National Institute of Technology Jamshedpur",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    startYear: 2023,
    endYear: 2027,
    cgpa: 8.34,
    location: "Jamshedpur, Jharkhand, India",
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Class XII",
    board: "State Board",
    year: 2023,
    percentage: 97.3,
    location: "Andhra Pradesh, India",
  },
  {
    institution: "Sri Chaitanya School",
    degree: "Class X",
    board: "State Board",
    year: 2021,
    percentage: 99.5,
    location: "Andhra Pradesh, India",
  },
];
