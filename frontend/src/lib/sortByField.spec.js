import sortByField from "./sortByField";

describe("sortByField", () => {
  it("Sorts array of objects descending by a given field", () => {
    const data = [{ test: "a_one" }, { test: "b_two" }, { test: "c_three" }];
    expect(data.sort((a, b) => sortByField(a, b, "test", "desc"))).toEqual([
      { test: "c_three" },
      { test: "b_two" },
      { test: "a_one" },
    ]);
  });

  it("Sorts array of objects ascending by a given field", () => {
    const data = [
      { project: "z_one" },
      { project: "x_two" },
      { project: "a_three" },
      { project: "f_four" },
    ];
    expect(data.sort((a, b) => sortByField(a, b, "project", "asc"))).toEqual([
      { project: "a_three" },
      { project: "f_four" },
      { project: "x_two" },
      { project: "z_one" },
    ]);
  });
});
