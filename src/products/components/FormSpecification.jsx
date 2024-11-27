import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
    IconButton,
    TextField,
    Button,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { setFormDataProduct } from '../../store/productsStore/Products';

import { useDispatch, useSelector } from 'react-redux';

export const FormSpecification = () => {

    const dispatch = useDispatch();
    
    const { dataProduc } = useSelector(state  => state.products);

    // State to hold multiple tables, each with its own title and rows
    const [tables, setTables] = useState(dataProduc.data.specifications);

    const [editingTableTitle, setEditingTableTitle] = useState(null); // Track if a table title is being edited
    const [editingCell, setEditingCell] = useState({ tableId: null, rowId: null, field: null }); // Track which cell is being edited

    // Handler to add a new blank row to a specific table
    const addRow = (tableId) => {
        setTables(prevTables => prevTables.map(table => {
            if (table.id === tableId) {
                const newRow = { id: Date.now(), label: "", value: "" };
                return { ...table, rows: [...table.rows, newRow] };
            }
            return table;
        }));
    };

    // Handler to add a new blank table
    const addTable = () => {
        const newTable = {
            id: Date.now(),
            title: "New Table",
            rows: [{ id: Date.now(), label: "", value: "" }],
        };
        setTables(prevTables => [...prevTables, newTable]);
    };

    // Handler for changing the title of a specific table
    const handleTitleChange = (tableId, newTitle) => {
        setTables(prevTables => prevTables.map(table =>
            table.id === tableId ? { ...table, title: newTitle } : table
        ));
    };

    // Handler to change a specific cell's content
    const handleCellChange = (tableId, rowId, field, newValue) => {
        setTables(prevTables => prevTables.map(table => {
            if (table.id === tableId) {
                const updatedRows = table.rows.map(row =>
                    row.id === rowId ? { ...row, [field]: newValue } : row
                );
                return { ...table, rows: updatedRows };
            }
            return table;
        }));
    };

    // Handler to start editing a cell
    const startEditing = (tableId, rowId, field) => {
        setEditingCell({ tableId, rowId, field });
    };

    // Handler to stop editing a cell
    const stopEditing = () => {
        setEditingCell({ tableId: null, rowId: null, field: null });
    };

    // Handler to save all tables' content
    const saveTables = () => {
        dispatch(setFormDataProduct({ specifications: tables }));
        // You can replace this with your save logic, such as sending to an API
        alert("Tables saved successfully!");
    };

    // Handler to delete a table by its ID
    const deleteTable = (tableId) => {
        setTables(tables.filter((table) => table.id !== tableId));
    };

    const editTitleTable = (tableId) => {
        alert(tableId)
        //setTables(tables.filter((table) => table.id !== tableId));
    };

    return (
        <div style={{ padding: '20px' }}>
            {tables.map(table => (
                <TableContainer key={table.id} component={Paper} style={{ marginBottom: '20px' }}>
                    <Box display="flex" alignItems="center" padding="16px">
                        {editingTableTitle === table.id ? (
                            <TextField
                                value={table.title}
                                onChange={(e) => handleTitleChange(table.id, e.target.value)}
                                onBlur={() => setEditingTableTitle(null)}
                                autoFocus
                            />
                        ) : (
                            <Typography
                                variant="h6"
                                component="div"
                                onClick={() => setEditingTableTitle(table.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {table.title}
                                {
                                    dataProduc.data.id != "" ?    
                                    <IconButton onClick={() => editTitleTable(table.id)} color="secondary">
                                        <EditIcon />
                                    </IconButton> : ""

                                }
                                <IconButton onClick={() => deleteTable(table.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </Typography>
                            
                        )}
                    </Box>
                    <Table>
                        <TableBody>
                            {table.rows.map(row => (
                                <TableRow key={row.id}>
                                    {['label', 'value'].map(field => (
                                        <TableCell
                                            key={field}
                                            onClick={() => startEditing(table.id, row.id, field)}
                                            style={{ border: '1px solid #dee2e6', cursor: 'pointer' }}
                                        >
                                            {editingCell.tableId === table.id &&
                                            editingCell.rowId === row.id &&
                                            editingCell.field === field ? (
                                                <TextField
                                                    value={row[field]}
                                                    onChange={(e) =>
                                                        handleCellChange(table.id, row.id, field, e.target.value)
                                                    }
                                                    onBlur={stopEditing}
                                                    autoFocus
                                                />
                                            ) : (
                                                row[field]
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {
                                        dataProduc.data.id != "" ?    
                                            <IconButton
                                                onClick={() => editTitleTable(prevTables =>
                                                    prevTables.map(t =>
                                                        t.id === table.id
                                                            ? { ...t, rows: t.rows.filter(r => r.id !== row.id) }
                                                            : t
                                                    )
                                                )}
                                            >
                                                <EditIcon />
                                            </IconButton> : ""

                                        }
                                        <IconButton
                                            onClick={() => setTables(prevTables =>
                                                prevTables.map(t =>
                                                    t.id === table.id
                                                        ? { ...t, rows: t.rows.filter(r => r.id !== row.id) }
                                                        : t
                                                )
                                            )}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        onClick={() => addRow(table.id)}
                        variant="contained"
                        color="primary"
                        style={{ margin: '10px' }}
                    >
                        Add Row
                    </Button>
                </TableContainer>
            ))}

            <Button
                onClick={addTable}
                variant="contained"
                color="primary"
                style={{ marginBottom: '20px' }}
            >
                Add Table
            </Button>

            <Box display="flex" justifyContent="flex-end" marginTop="20px">
            {
                    dataProduc.data.id !== "" ? ""
                    /*<Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => saveTables(dataProduc.data.id)}
                        style={{ marginLeft: 8 }}
                    >
                    Edit Tables
                  </Button>*/ :

                <Button
                    onClick={saveTables}
                    variant="contained"
                    color="success"
                    style={{ marginTop: '20px', padding: '10px 20px' }}
                >
                    Save All Tables
                </Button>

                  }

            </Box>
        </div>
    );
};
