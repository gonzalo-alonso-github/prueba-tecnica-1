import './App.css'
import { UsersList } from './components/UsersList'
import { type User, SortBy } from './types.d'
import { useState, useEffect, useRef, useMemo } from 'react'

function App(){
  const originalUsers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [mustShowContrast, setMustShowContrast] = useState<boolean>(false)
  // const [mustBeOrderedByCountry, setMustBeOrderedByCountry] = useState<boolean>(false) // se comenta en la ultima tarea, la 10
  const [filterWordCountry, setFilterWordCountry] = useState<string | null>(null)
  const [columnToOrderBy, setColumnToOrderBy] = useState<SortBy>(SortBy.NONE) // tarea 10

  /* ************** */
  /* PETICION A API */
  /* ************** */

  useEffect(
    () => {
      fetch('https://randomuser.me/api?results=100')
        .then(async res => await res.json()) // no usar llaves ni parentesis en los async await
        .then((res) => {
            const results: User[] = res.results
            setUsers(results)
            originalUsers.current = results
        })
        .catch((err) => { console.error(err) })
    },
    []
  )

  /* ***************************** */
  /* MOSTRAR CONTRASTE EN LA TABLA */
  /* ***************************** */

  const toggleMustShowContrast = function (){
    setMustShowContrast(prevState => !prevState)
  }

  /* ****************** */
  /* FILTRAR SEGUN PAIS */
  /* ****************** */

  const handleFilterCountry = function(word: string | null){
    setFilterWordCountry(word)
  }

  /* Se llama en cada inicializacion de usersFilteredByCountry */
  const getUsersFilteredByCountry = function(){
    console.log("Filtrado de la lista segun Pais con la palabra '" + filterWordCountry + "'")
    const result = filterWordCountry !== null && filterWordCountry.length > 0 ?
      users.filter(
        (user) => {
          return user.location.country.toLowerCase().includes(filterWordCountry.toLowerCase())
        }
      )
      :
      users
    return result
  }

  /* Esta constante se vuelve a inicializar con cada renderizado, solo por estar definida aqui */
  // const usersFilteredByCountry = getUsersFilteredByCountry()
  /* Esa constante se volveria a inicializar con cada renderizado, solo por estar definida aqui.
  Eso ocasionaria que el useMemo de usersOrderedByCountry que usamos mas abajo
  se dispare siempre con cada renderzado, cosa que debemos evitar segun la tarea 9.
  Asi que comentamos esa linea de arriba y emplearemos useMemo tambien aqui. */
  const usersFilteredByCountry = useMemo(
    () => {return getUsersFilteredByCountry()},
    [users, filterWordCountry]
  )
  /* Mucho ojo con las depedencias que le ponemos al useMemo:
  si no le pones dependencia de un estado anterior de la lista (users),
  no se cargara al primer renderizado */

  /* ******************* */
  /* ORDENACION POR PAIS */
  /* ******************* */

  // Todo esto se deja comentado en la ultima tarea, la 10
  /*
  const toggleMustBeOrderedByCountry = function (){
    setMustBeOrderedByCountry(prevState => !prevState)
  }

  // Se llama en cada inicializacion de usersOrderedByCountry
  const getUsersOrderedByCountry = function(){
    console.log("Ordenacion de la lista segun Pais")
    const result = mustBeOrderedByCountry ?
      usersFilteredByCountry.toSorted(
        (a, b) => { return a.location.country.localeCompare(b.location.country) }
      )
      :
      usersFilteredByCountry
    return result
  }

  // const usersOrderedByCountry = getUsersOrderedByCountry()
  // Esa constante se volveria a inicializar con cada renderizado, solo por estar definida aqui.
  // Debemos evitarlo (es la tarea numero 9), asi que comentamos esa linea y emplearemos useMemo
  const usersOrderedByCountry = useMemo(
    () => {return getUsersOrderedByCountry()},
    [usersFilteredByCountry, mustBeOrderedByCountry]
  )
  // Mucho ojo con las depedencias que le ponemos al useMemo:
  // si no le pones dependencia de un estado anterior de la lista (usersFilteredByCountry),
  // no se cargara al primmer renderizado
  */

  /* ******************************** */
  /* ORDENACION POR COLUMNAS DE TABLA */
  /* ******************************** */

  const handleColumnToOrderBy = function(columnTitle: SortBy){
    setColumnToOrderBy(columnTitle)
  }

  const getUsersOrderedByColumn = (usersListParam: User[]) => {
    if (columnToOrderBy === SortBy.NONE) return usersListParam
    /* Definimos una constante de tipo Record (un Record es como el Map de Java),
    donde las keys son los nombres de columnas de la tabla (criterio de ordenacion),
    y sus values son funciones; funciones que reciben un user y le extraen la propiedad de ordenacion */
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }
    return usersListParam.toSorted(
      (user1: User, user2: User) => {
        const extractedProperty = compareProperties[columnToOrderBy]
        return extractedProperty(user1).localeCompare(extractedProperty(user2))
      }
    )
  }

  const usersOrderedByColumn = useMemo(
    () => {return getUsersOrderedByColumn(usersFilteredByCountry)},
    [usersFilteredByCountry, columnToOrderBy]
  )
  // Mucho ojo con las depedencias que le ponemos al useMemo:
  // si no le pones dependencia de un estado anterior de la lista (usersFilteredByCountry),
  // no se cargara al primmer renderizado

  /* **************** */
  /* BORRAR ELEMENTOS */
  /* **************** */

  const handleDeleteUser = function (uuid: string){
    const userListModified = users.filter(
      (user) => { return user.login.uuid !== uuid }
    )
    setUsers(userListModified)
  }

  /* ***************************** */
  /* RESETEAR INFORMACION ORIGINAL */
  /* ***************************** */

  const handleReset = function(){
    setUsers(originalUsers.current)
  }

  return (
    <>
      <div className="container">
        <h1>Vite + React and Typescript</h1>
        <header>
          <button className="control-width-lg" onClick={toggleMustShowContrast}>Contrast</button>

          {/* El siguiente button se ha dejado comentado para hacer la ultima tarea, la 10 */}
          {/* <button className="control-width-lg" onClick={toggleMustBeOrderedByCountry}>{mustBeOrderedByCountry ? "No Order" : "Country Order"}</button> */}

          {/* El siguiente button es el de la ultima tarea, la 10 */}
          <button className="control-width-lg" onClick={() => {handleColumnToOrderBy(columnToOrderBy === SortBy.COUNTRY ? SortBy.NONE : SortBy.COUNTRY)}}>
            {columnToOrderBy === SortBy.COUNTRY ? "No Order" : "Country Order"}
          </button>

          <button className="control-width-lg" onClick={handleReset}>Reset</button>

          <input type="text" className="control-width-lg" placeholder="Filter by Country" onChange={(e) => {handleFilterCountry(e.target.value)}}></input>
        </header>
        <main>
          <UsersList
            // users={usersOrderedByCountry} // se comenta para hacer la ultima tarea, la 10
            users={usersOrderedByColumn}
            mustShowContrast={mustShowContrast}
            handleDelete={handleDeleteUser}
            handleColumnToOrderBy={handleColumnToOrderBy}></UsersList>
        </main>
      </div>
    </>
  )
}

export default App
