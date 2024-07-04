function addItem() {
  var item = document.getElementById("item").value;
  var quantity = document.getElementById("quantity").value;
  var price = document.getElementById("price").value;
  var total = quantity * price;

  var table = document.getElementById("nota-body");
  var row = table.insertRow();
  row.insertCell(0).innerHTML = item;
  row.insertCell(1).innerHTML = quantity;
  row.insertCell(2).innerHTML = price;
  row.insertCell(3).innerHTML = total;

  // Clear input fields
  document.getElementById("item").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

function exportToPDF() {
  var { jsPDF } = window.jspdf;
  var doc = new jsPDF({
    format: 'a5'
  });

  var notaType = document.getElementById('nota-type').value;
  var img = document.getElementById('logo');
  if (img) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    var imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 30, 30);
  }

  doc.setFontSize(20);
  doc.text("Nota Online", 74, 50, null, null, 'center');

  var paymentDate = document.getElementById('payment-date').innerText;
  doc.setFontSize(12);
  doc.text(paymentDate, 10, 60);

  var giver = document.getElementById('giver').value;
  var receiver = document.getElementById('receiver').value;
  doc.text("Nama Pemberi: " + giver, 10, 70);
  doc.text("Nama Penerima: " + receiver, 10, 80);

  var notes = document.getElementById('notes').value;
  doc.text("Keterangan: " + notes, 10, 90);

  if (notaType === 'type1') {
    doc.text("Jenis Nota 1", 74, 100, null, null, 'center');
  } else {
    doc.text("Jenis Nota 2", 74, 100, null, null, 'center');
  }

  doc.text("Item", 10, 110);
  doc.text("Kuantitas", 55, 110);
  doc.text("Harga", 100, 110);
  doc.text("Total", 145, 110);

  var table = document.getElementById('nota-body');
  var rows = table.getElementsByTagName('tr');
  var startY = 120;
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].getElementsByTagName('td');
    for (var j = 0; j < cols.length; j++) {
      var x = 10 + j * 45;
      var y = startY + i * 10;
      doc.text(cols[j].innerText, x, y);
    }
  }

  doc.text("Tanda Tangan Penerima:", 10, startY + rows.length * 10 + 20);
  doc.line(10, startY + rows.length * 10 + 25, 60, startY + rows.length * 10 + 25);

  doc.text("Tanda Tangan Pemberi:", 100, startY + rows.length * 10 + 20);
  doc.line(100, startY + rows.length * 10 + 25, 150, startY + rows.length * 10 + 25);

  doc.save('nota.pdf');
}

function setPaymentDate() {
  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  document.getElementById('payment-date').innerText = "Tanggal Pembayaran: " + date;
}

window.onload = setPaymentDate;
