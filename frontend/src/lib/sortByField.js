const sortByField = (a, b, field, direction) => {
  const nameA = a[field].toLowerCase();
  const nameB = b[field].toLowerCase();
  if (nameA < nameB) {
    return direction === "asc" ? -1 : 1;
  } else {
    return direction === "asc" ? 1 : -1;
  }
};

export default sortByField;
