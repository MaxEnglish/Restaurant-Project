const headers = (newHeader) => {
    return {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*", newHeader};
}

exports.getMenu = () => {
    const res = fetch("/api", {
      headers: headers({ reqType: "get-menu" }),
    });
    const data = res;
    return data;
  };

exports.getTables = () => {
    fetch('/api', {
        headers: headers({"reqType": "get-tables"}),
    }).then(
        response => response.json()).then(
        data => {
            return data;
         })
}

exports.addTable = (data) => {
    fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: headers({"reqType": "new-table"}),
        body: JSON.stringify(data)
    }) 
}


exports.removeTable = (data) => {
    fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: headers({"reqType": "remove-table"}),
        body: JSON.stringify(data)
    }) 
}


