// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getUser, genereContrat } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Download, Archive } from 'react-feather'
import handleDeleteUser from '../list/Table'

import path from 'path'

const stateNum = Math.floor(Math.random() * 6)
const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
const color = states[stateNum]
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
  const color = states[stateNum]
  const imageUrl = `http://localhost:3001/assets/${row.avatar}`
  
  console.log('row.avatar', row.avatar)
  console.log('imageUrl', imageUrl)

  return (
    <Avatar
      color={color || 'primary'}
      className='mr-1'
      img={imageUrl}
      content={row.avatar || 'John Doe'}
      initials
    />
  )
}


const renderRole = row => {
  const roleObj = {
    All: {
      class: 'text-primary',
      icon: User
    },
    candidat: {
      class: 'text-success',
      icon: Database
    },
    moniteur: {
      class: 'text-info',
      icon: Edit2
    }

  }

  const Icon = roleObj[row.emploi] ? roleObj[row.emploi].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.emploi] ? roleObj[row.emploi].class : ''} mr-50`} />
      {row.emploi}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = role => [
  {
    name: 'User',
    minWidth: '297px',
    selector: 'fullName',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex align-items-center'>
          {row.avatar ? (
            <Avatar img={`http://localhost:3001/assets/${row.avatar}`} />
          ) : (
            <Avatar 
              color={color || 'primary'}
              content={row.username ? row.username.charAt(0).toUpperCase() : ''}
            />
          )}
        </div>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.idUser}`}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getUser(row.idUser))}
          >
            <span className='font-weight-bold mx-1'>{`${row.username}`}</span>
          </Link>
          {/* <small className='text-truncate text-muted mb-0 mx-1'>{row.password}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Email',
    minWidth: '320px',
    selector: 'email',
    sortable: true,
    cell: row => row.email
  },
  {
    name: 'Phone Number',
    minWidth: '172px',
    selector: 'numero_telephone1',
    sortable: true,
    cell: row => row.numero_telephone1
  },
  role === 'ecole' ? {
    name: 'Role',
    minWidth: '138px',
    selector: 'role',
    sortable: true,
    cell: row => row.emploi
  } : null,
  {
    name: 'Address',
    minWidth: '238px',
    selector: 'adresse',
    sortable: true,
    cell: row => row.adresse
  },
  role === 'ecole' ? {
    name: 'Permit',
    minWidth: '238px',
    selector: 'permit',
    sortable: true,
    cell: row => {
      // Check if candidate has associated contract and permit first
      if (row.condidat?.contrats[0]?.permi) {
        return row.condidat.contrats[0].permi.type || ''
      } else {
        return ''
      }
    }
  } : null,
  {
    name: 'Genre',
    minWidth: '138px',
    selector: 'genre',
    sortable: true,
    cell: row => row.genre
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/user/view/${row.idUser}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.idUser))}
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.idUser}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.idUser))}
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
          {row.emploi === 'candidat' && (
            <DropdownItem
              className='w-100'
              onClick={() => store.dispatch(genereContrat(row.idUser))}
            >
              <Download size={14} className='mr-50' />
              <span className='align-middle'>Download</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
].filter(column => column) // Remove null values from the array
