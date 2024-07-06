import React from 'react'
import { Button, Badge } from 'reactstrap'

const CustomActionButton = ({ row, onClick }) => {
  return (
    <Button color='primary' size='sm' className='btn-icon' onClick={() => onClick(row)}>
      Edit
    </Button>
  )
}

export const columns = (handleEditButtonClick) => [
  {
    name: 'Name',
    selector: 'nom',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.nom}</span>
  },
  {
    name: 'Address',
    selector: 'adresse',
    sortable: true,
    minWidth: '200px',
    cell: row => <span>{row.adresse}</span>
  },
  {
    name: 'City',
    selector: 'ville',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.ville}</span>
  },
  {
    name: 'Postal Code',
    selector: 'code_postal',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.code_postal}</span>
  },
  {
    name: 'Country',
    selector: 'pays',
    sortable: true,
    minWidth: '120px',
    cell: row => (
      <Badge color='light-primary' pill>
        {row.pays}
      </Badge>
    )
  },
  {
    name: 'Telephone',
    selector: 'telephone',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.telephone}</span>
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '200px',
    cell: row => <span>{row.email}</span>
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '200px',
    cell: row => <span>{row.status}</span>
  },
  {
    name: 'candidate number',
    selector: 'candidats',
    sortable: true,
    minWidth: '200px',
    cell: row => <span>{row.candidats}</span>
  },
  {
    name: 'Action',
    minWidth: '110px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <CustomActionButton row={row} onClick={handleEditButtonClick}  />
      </div>
    )
  }
]

