# ms-ue-restaurantes

Microservicio REST para la plataforma UE. Expone los restaurantes almacenados en Firebase Firestore ordenados por distancia al usuario. Construido con Node.js + Express + TypeScript.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
FIREBASE_PROJECT_ID=
```

Coloca el archivo `firebase-service-account.json` (credenciales de Firebase Admin SDK) en la raíz del proyecto. Se obtiene desde Firebase Console → Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada.

## Levantar en desarrollo

```bash
npm run dev
```

El servicio queda disponible en [http://localhost:3000](http://localhost:3000).

La documentación Swagger UI se puede consultar en [http://localhost:3000/docs](http://localhost:3000/docs).

## Compilar y ejecutar en producción

```bash
npm run build
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/fetch-restaurants?lat=&lng=` | Retorna restaurantes ordenados por distancia |
| `POST` | `/log` | Recibe logs del BackOffice y los escribe en archivo local |
| `GET` | `/health` | Estado del servicio |
| `GET` | `/docs` | Swagger UI |

### Ejemplo

```
GET /fetch-restaurants?lat=-12.0464&lng=-77.0428
```

## Logs

Los logs se escriben en `logs/app.log` (archivo local) y en la tabla `logs` de Supabase. El archivo local se puede consultar directamente para diagnóstico.

## Servicios externos requeridos

| Servicio | Uso |
|---|---|
| Firebase Firestore | Lectura de restaurantes |
| Supabase PostgreSQL | Escritura de logs |
