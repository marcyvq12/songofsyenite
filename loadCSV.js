function loadCSV(path) {
  promise = d3.csv(path).then(function(data) {
  data.forEach(row => {
      const field =  row["column_name"];
  });
  return data;
});
  return promise;
}