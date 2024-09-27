import React from 'react';

const EditCell = ({ row, table }) => {
    /** @type {TableMeta} */
    const meta = table.options.meta;
  
    const setEditedRows = (e) => {
      const elName = e.currentTarget.name;
      meta?.setEditedRows((old) => ({
        ...old,
        [row.id]: !old[row.id],
      }));
  
      if (elName !== "edit") {
        meta?.revertData(row.index, elName === "cancel");
      }
    };
  
    return (
      <div className="edit-cell-container">
        {meta?.editedRows[row.id] ? (
          <div className="edit-cell">
            <button onClick={setEditedRows} name="cancel">
              X
            </button>
            <button onClick={setEditedRows} name="done">
              ✔
            </button>
          </div>
        ) : (
          <button onClick={setEditedRows} name="edit">
            ✐
          </button>
        )}
      </div>
    );
  };
export default EditCell;