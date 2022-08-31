exports.getMenu = () => {
  const res = fetch("/api", {
    headers: { "reqType": "get-menu" },
  });
  const data = res;
  return data;
};

exports.getNumOfTables = () => {
  const res = fetch("/api", {
    headers: { "reqType": "get-num-of-tables" },
  });
  const data = res;
  return data;
};


exports.getTables = () => {
  const res = fetch('/api', {
    headers: { "reqType": "get-tables" },
  });
  const data = res;
  return data;
}

exports.addTable = (data) => {
  fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "reqType": "new-table" },
    body: data
  })
}


exports.removeTable = (data) => {
  fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "reqType": "remove-table" },
    body: JSON.stringify(data)
  })
}

exports.replaceTable = (data) => {
  console.log(data)
  fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "reqType": "replace-table" },
    body: data
  })
}


