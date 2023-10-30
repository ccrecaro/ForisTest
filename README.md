# Problema de código Foris
### Carolina Contreras

## Instrucciones de ejecución
Para correr el programa principal primero descargar las dependencias usando `npm install` y luego usar la instrucción `node ./app/processEntryFile.js <file path>`. En el repositorio se ha dejado un archivo de prueba en `./input.txt`.

Para los test ejecutar `npm test`.

## Solución
He pensado en una solución que dividiera los comandos en clases especificas, para hacer que la lectura del código fuera clara.

La solución se divide en 3 archivos:

- student.js: Contiene a la clase *Student*, la cual guarda el nombre del estudiante, el tiempo que ha estado en clases y un set con los días que ha ido. Se ha decidido guardar estos datos para mantener un registro de asistencia unido a cada nombre de los estudiantes. Además, los días se representan como un set para evitar que se repitan registros. Los métodos de esta clase son:
    - Getter y setters para evitar el acceso directo a las propiedades de la clase.
    - `addPresence(day, startTime, endTime)`: Agrega asistencia de un estudiante. Primero chequea que los formatos de dia y tiempo esten correctos, y luego suma la duración y el día a los registros ya existentes del estudiante.
    - `getDaysCount()`: Entrega el tamaño del set de días asistidos. Esto es para usarlo luego en el reporte.
    - `calculatePresenceDuration(start, end)`: Calcula la duración de la clase; entrega error si es que la duración es negativa (este es el caso en donde la hora de inicio es posterior a la de termino).
    - Chequeos de formato para dia y tiempo.

- university.js: Tiene la clase *University*, que guarda en un objeto *students* todos los estudiantes (de tipo Student) que registra la universidad.
    - Getters y setters
    - `registerStudent(name)`: Crea un estudiante nuevo y lo agrega a students.
    - `addStudentPresence(name, day, startTime, endTime)`: Registra una asistencia, creando al estudiante si no existe o agregando los tiempos y dia si es que no.
    - `generateReport()`: Toma los valores de *students*, ordenandolos desde el estudiante que más tiempo ha ido a clases al que menos y generando un arreglo con su nombre, minutos asistidos y días.

- processing.js: Tiene la lógica de lectura del archivo que se entrega inicialmente y el procesamiento de los comandos Student y Presence.

Además de estos archivos, existen dos archivos de test en la carpeta *./test*: *student.js* y *university.js*


## Consideraciones
Si el alumno no ha sido agregado con el comando Student, pero es llamado usando el comando Presence, se agrega como estudiante.

Para simplificar el problema, y debido a que el output no usaba esta información, se ha obviado el dato de la sala en donde es la clase.
