const defaultHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

exports.getMenu = () => {
  const res = fetch("/api", {
    headers: { defaultHeaders, "reqType": "get-menu" },
  });
  const data = res;
  return data;
};

exports.getNumOfTables = () => {
  const res = fetch("/api", {
    headers: { defaultHeaders, "reqType": "get-num-of-tables" },
  });
  const data = res;
  return data;
};


exports.getTables = () => {
  const res = fetch('/api', {
    headers: { defaultHeaders, "reqType": "get-tables" },
  });
  const data = res;
  return data;
}

exports.addTable = (data) => {
  console.log(data)
  console.log(JSON.stringify(data))
  fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "reqType": "new-table" },
    body: data
  })
}


exports.removeTable = (data) => {
  fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: { defaultHeaders, "reqType": "remove-table" },
    body: JSON.stringify(data)
  })
}

exports.replaceTable = (data) => {
  console.log(data)
  fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: { defaultHeaders, "reqType": "replace-table" },
    body: JSON.stringify(data)
  })
}


