import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

function createData(name, monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) {
  return {
    name,
    monday: monday.split('-'),
    Tuesday: Tuesday.split('-'),
    Wednesday: Wednesday.split('-'),
    Thursday: Thursday.split('-'),
    Friday: Friday.split('-'),
    Saturday: Saturday.split('-'),
    Sunday: Sunday.split('-')
  };
}

const initialRows = [
  createData('Math', '159-50', '100-40', '35-10', '40-20', '50-30', '40-20', '50-30'),
  createData('Science', '237-70', '90-30', '37-20', '43-10', '40-30', '50-40', '60-50'),
  createData('TYT', '262-80', '160-40', '24-10', '60-20', '40-30', '50-40', '60-50'),
];

export default function AccessibleTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [editingCell, setEditingCell] = React.useState({ rowIdx: null, cellName: null });
  const [isFocused, setIsFocused] = React.useState(false);

  const handleDoubleClick = (rowIdx, cellName) => {
    setEditingCell({ rowIdx, cellName });
    setIsFocused(true);
  };

  const handleChange = (event, rowIdx, cellName, valueIdx) => {
    const newRows = [...rows];
    newRows[rowIdx][cellName][valueIdx] = event.target.value;
    setRows(newRows);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!isFocused) {
        setEditingCell({ rowIdx: null, cellName: null });
      }
    }, 0);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleFieldBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditingCell({ rowIdx: null, cellName: null });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Monday</TableCell>
            <TableCell align="right">Tuesday</TableCell>
            <TableCell align="right">Wednesday</TableCell>
            <TableCell align="right">Thursday</TableCell>
            <TableCell align="right">Friday</TableCell>
            <TableCell align="right">Saturday</TableCell>
            <TableCell align="right">Sunday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {['monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <TableCell
                  key={day}
                  size='small'
                  align="right"
                  onDoubleClick={() => handleDoubleClick(rowIndex, day)}
                  >
                  {editingCell.rowIdx === rowIndex && editingCell.cellName === day ? (
                    <>
                      <TextField
                        value={row[day][0]}
                        onChange={(e) => handleChange(e, rowIndex, day, 0)}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        label=""
                        color='warning'
                        size ="small"
                        sx={{
                          '& .MuiInputBase-input': {
                            padding: 0,
                            textAlign: 'right',
                          },
                          marginRight: 1,
                          width: '45%',
                        }}
                      />
                      -
                      <TextField
                        value={row[day][1]}
                        size='small'
                        onChange={(e) => handleChange(e, rowIndex, day, 1)}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        label=""
                        sx={{
                          '& .MuiInputBase-input': {
                            padding: '2px 0',
                            textAlign: 'right',
                            fontSize: '0.875rem',
                          },
                          marginLeft: 0.5,
                          width: '40%',
                        }}
                      />
                    </>
                  ) : (
                    `${row[day][0]}-${row[day][1]}`
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
