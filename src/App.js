import './App.css';
import React, { useState } from 'react';
let App = () => {
  let [rows, setRows] = useState([]);
  let handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        ad: '',
        soyad: '',
        maas: '',
        isEditing: true,
      },
    ]);
  };
  let handleCancel = (index) => {
    if (window.confirm('Silmek isteyirsiniz?')) {
      let newRows = rows.filter((_, i) => i !== index);
      setRows(newRows.map((row, idx) => ({ ...row, id: idx + 1 })));
    }
  };

  let handleSave = (index) => {
    let row = rows[index];
    if (row.ad.trim() === '' || row.soyad.trim() === '' || row.maas.trim() === '') {
      alert('Xanalari doldurun');
      return;
    }
    setRows(
      rows.map((row, i) => (i === index ? { ...row, isEditing: false } : row))
    );
  };

  let handleDelete = (index) => {
    if (window.confirm('Silmek isteyirsiniz?')) {
      let newRows = rows.filter((_, i) => i !== index);
      setRows(newRows.map((row, idx) => ({ ...row, id: idx + 1 })));
    }
  };

  let handleEdit = (index) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, isEditing: true } : row))
    );
  };

  let handleInputChange = (index, field, value) => {
    let updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  let handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleSave(index);
    } else if (e.key === 'Escape') {
      handleCancel(index);
    }
  };

  return (
    <div className="container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sira</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Maas</th>
            <th>
              <span id='function'>Emeliyyatlar</span>
              <button onClick={handleAddRow}>Elave et</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {row.isEditing && (
                  <input
                    type="text"
                    value={row.ad}
                    onChange={(e) =>
                      handleInputChange(index, 'ad', e.target.value)
                    }
                    onKeyDown={(e) => handleKeyPress(e, index)}
                  />
                )}
                {!row.isEditing && row.ad}
              </td>
              <td>
                {row.isEditing && (
                  <input
                    type="text"
                    value={row.soyad}
                    onChange={(e) =>
                      handleInputChange(index, 'soyad', e.target.value)
                    }
                    onKeyDown={(e) => handleKeyPress(e, index)}
                  />
                )}
                {!row.isEditing && row.soyad}
              </td>
              <td>
                {row.isEditing && (
                  <input
                    type="text"
                    value={row.maas}
                    onChange={(e) =>
                      handleInputChange(index, 'maas', e.target.value)
                    }
                    onKeyDown={(e) => handleKeyPress(e, index)}
                  />
                )}
                {!row.isEditing && row.maas}
              </td>
              <td>
                {row.isEditing ? (
                  <div>
                    <button className="cancel-button" onClick={() => handleCancel(index)}>Imtina et</button>
                    <button className="save-button" onClick={() => handleSave(index)}>Yadda saxla</button>
                  </div>
                ) : (
                  <div>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Sil</button>
                    <button className="edit-button" onClick={() => handleEdit(index)}>Duzelis et</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
