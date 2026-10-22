



IMPLEMENTAR EL USO DE usereducer, useactionstate, usecontext 



GET https://pokeapi.co/api/v2/pokemon/{name}

el {name } es el texto buscado en minusuclas y sin espacio sexternos. debe coincidir con el nombre del pokemon como pikachu y no PublicKeyCredential.apply



mapear solo las propiedades:

propiedad de respuesta, campo del formualrio  y tipo:
id, pokemonID, numero
name pokemonName, texto
sprites.front_default, imagen, TextDecoder. si viene null, guarda "".
types[0].type.name, type, texto. solo el primer tipo.

nota: no lear types[1]




crear una clase como referencia llamada PokemonDetails







DAtos y reglas de negocio

entryId: identificador unico del registro al enviar. no usar el id del pokemon ya que peude haber mas de un mismo pokemon reigstrado

el pokemonId, pokemonName, image, type salen del pokemon cargado.
nickname: minimo 3 caracteres
role: uno de estos valores: titular y reserva.
query: PokeAPI






### Comportamiento requerido:


Busqueda: si tiene menos de 3 caracters miestra error y no llames a PokeAPI. si es valido consulta polemon/name. si exsite, carga ese pokemon en el formulario y sustituye la seleccion previa. si responde 404, muestra "sin resultados" y no cambies el pokemon ya cargado. si la peticion falla por otracosa, "no se puedo consultar POKEAPI" y no inventar pokemon. el apodo y el rol no se rellenan en el api.


Registro: valida dentro de la action administrada por useActionState no bsat con atributos HTML. Exige un pokemon cargado, un apodo valido y un rol permitido. muestra error por cada dato invalido  no modificar lista. el rol se se valida contra titular y reserva, no solo porque exista en el select.


ENvio simulado: si los dato sson valiods, espera aproximadamente 1 segundo enates de agrgarlos durante la espera, desahabilita el envio  y muestra "registrando..." con isPending. no debe recargarse la pagina ni envairse el reigsotro a pokeapi

Listado: muestra imagen, apodo, nombre, numero, tipo,rol u la accion de eliminar, agrega los neuvos al final u usan una keu estable basada en el entryId




ELiminar: retira unicamente el registro seleccioando, sin confirmacion

Resumen: Total,titulares  reservas se calculan a partir de la lista, los contadores n son estados independientes.

Lista vacia: al eliminar el ultimo registro debe reaparecer EmptyState, y todos los contadores deben ser cero.



UseReducer: Administrar la coleccion unuca der registros y las operacion
de agregar y eliminar. el reducer es puro: sinmutacion sin fetch, sin temporazadores y sin gneraer identificadores


usecontext: compartir la coleccion, dispatch y el pokemon seleccionado mediante un provider comun, pokemonsearch.
PokemonForm, RegistryList y RegistrySummary consumirlo directamente o mediante un custom hook basado en useContext. no pasar la coleccion desde App por props.

useActionState: adminsitar el resultado de la action del formulario de reigdtro,
sus errores, la confirmacion e isPending. conectar la action devuelta a formaction. tras validar y esperar, enviar el alta el reducer compartido. el apodo y el rol se leen de FOrmData. los datos del pokemon se leen del sleccionado en el contexto



COMPROBACIONES

- un envio invalido despues d eun exito muestra los errores actuales, ya no el mensaje de confirmacion, y la coleccion
no cambia. la consola no muestra errores de hooks ni de keys.

- eliminar el ultimo: estado vacio y resumen 0/0/0
un segundo registro valido con rol reserva: dos tarjetas
, identificadores distintos y resumen 2/1/1

- enviar sin apodo, o con apodo de 2 caracteres, o sin rol: errores y ningun alta

- buscar pikachu llena el firmulario con 25, pikachu y electric , y muestra su front_default


bucar pi no 
