import { type User, SortBy } from '../types.d'
interface Props{
    users: User[];
    mustShowContrast: boolean;
    handleDelete: (uuid: string) => void;
    handleColumnToOrderBy: (columnToOrderBy: SortBy) => void;
}

export function UsersList({users, mustShowContrast, handleDelete, handleColumnToOrderBy}: Props){
    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th onClick={() => {handleColumnToOrderBy(SortBy.NAME)}}>Name</th>
                    <th onClick={() => {handleColumnToOrderBy(SortBy.LAST)}}>Surname</th>
                    <th onClick={() => {handleColumnToOrderBy(SortBy.COUNTRY)}}>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className={mustShowContrast ? 'table-contrast' : ''}>
                {
                    users.map(
                        (user, index) => {
                            return (
                                <tr key={user.login.uuid}>
                                    <td><img src={user.picture.thumbnail}/></td>
                                    <td>{user.name.first}</td>
                                    <td>{user.name.last}</td>
                                    <td>{user.location.country}</td>
                                    <td><button onClick={() => {handleDelete(user.login.uuid)}} >Delete</button></td>
                                </tr>
                            )
                        }
                    )

                }
            </tbody>
        </table>
    )
}
