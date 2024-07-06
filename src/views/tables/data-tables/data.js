// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { getData } from '../../apps/calendar/store/actions'
// // ** Vars
// const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    maxWidth: '100px'
  },
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '310px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Age',
    selector: 'age',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '175px'
  }
]
// export let data
// ** Expandable table component

const ExpandableTable = ({ data }) => {
  console.log('.......', data)
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Monitor:</span> {data.moniteur.user.username}
      </p>
      <p>
        <span className='font-weight-bold'>Car:</span> {data.voitures.modele}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Event Date:</span> {data.date_debut}** {data.date_fin}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = storeData => [
  // {
  //   name: 'Name',
  //   selector: 'full_name',
  //   sortable: true,
  //   minWidth: '250px',
  //   cell: row => (
  //     <div className='d-flex align-items-center'>
  //       {row.avatar === '' ? (
  //         <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
  //       ) : (
  //         <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
  //       )}
  //       <div className='user-info text-truncate ml-1'>
  //         <span className='d-block font-weight-bold text-truncate'>{row.full_name}</span>
  //         <small>{row.post}</small>
  //       </div>
  //     </div>
  //   )
  // },
  {
    name: 'Event Name ',
    selector: 'nom_evenement',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'date_creation',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Event',
    selector: 'type',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Candidat',
    selector: 'condidat.user.username',
    sortable: true,
    minWidth: '100px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.condidat.user.avatar ? (
          <Avatar img={`http://localhost:3001/assets/${row.condidat.user.avatar}`} />
        ) : (
          <Avatar content={row.condidat.user.username.charAt(0).toUpperCase()} />
        )}
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.condidat.user.username}</span>
        </div>
      </div>
    )
  }
]

// // ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '150px'
  }
  // {
  //   name: 'Status',
  //   selector: 'status',
  //   sortable: true,
  //   minWidth: '150px',
  //   cell: row => {
  //     return (
  //       <Badge color={status[row.status].color} pill>
  //         {status[row.status].title}
  //       </Badge>
  //     )
  //   }
  // // },
  // {
  //   name: 'Actions',
  //   allowOverflow: true,
  //   cell: row => {
  //     return (
  //       <div className='d-flex'>
  //         <UncontrolledDropdown>
  //           <DropdownToggle className='pr-1' tag='span'>
  //             <MoreVertical size={15} />
  //           </DropdownToggle>
  //           <DropdownMenu right>
  //             <DropdownItem>
  //               <FileText size={15} />
  //               <span className='align-middle ml-50'>Details</span>
  //             </DropdownItem>
  //             <DropdownItem>
  //               <Archive size={15} />
  //               <span className='align-middle ml-50'>Archive</span>
  //             </DropdownItem>
  //             <DropdownItem>
  //               <Trash size={15} />
  //               <span className='align-middle ml-50'>Delete</span>
  //             </DropdownItem>
  //           </DropdownMenu>
  //         </UncontrolledDropdown>
  //         <Edit size={15} />
  //       </div>
  //     )
  //   }
  // }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    name: 'Full Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Office',
    selector: 'city',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Start Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '150px'
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Post',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '100px'
  }
]

export default ExpandableTable
