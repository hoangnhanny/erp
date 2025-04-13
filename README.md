# ERP SYSTEM

A simple ERP system including modules for managing purchase orders, inventory, suppliers, products, and reports. It supports user authentication, role-based access, and automated report generation.

## ⚙️ Setup Instructions

### 1. Run source code

```bash
git clone repository
npm install

```

# Create file .env then add some variable example

JWT*SECRET=mySuperSecretKey123
JWT_EXPIRES_IN=1d
PORT=3003
SCHEDULE_INTERVAL = 1000 * 60 \_ 60 \* 24 # 1 day

# Create file .env then add some variable example

# Prepare for Postgres database and redis

DB_HOST=localhost
DB_USER= your database
DB_PASS= your database
DB_NAME=erp

REDIS_HOST=localhost
REDIS_PORT=6379

### 2. Start app local

Start service app

```bash

npm run dev

```

Start service worker

```bash

npm run worker

```

Start service cron

```bash

npm run cron

```

## ⚙️ API router List

After start source code

# I have link to Swagger API : http://localhost:3003/api-docs/

In swagger will be define Input for API => Please visit this link to action

You must be register user => login => get token => Authorize in Swagger => Action api with the System

# Authentication

| Method | Endpoint             | Description                                  |
| ------ | -------------------- | -------------------------------------------- |
| POST   | `/auth/login`        | Login user in to system                      |
| POST   | `/auth/registerUser` | Create user to access and action with system |

# Product

=> All role can be access

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| POST   | `/api/product/createProduct`  | Create new product        |
| PUT    | `/api/product/updateProduct`  | Update product            |
| POST   | `/api/product/getListProduct` | Get all product in system |

# Supplier

=> All role can be access

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| POST   | `/api/product/createSupplier`  | Create new supplier        |
| GET    | `/api/product/getListSupplier` | Get all supplier in system |

# User

=> All role can be access

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/api/user/createUser`  | Create new user        |
| POST   | `/api/user/getListUser` | Get all user in system |

# Purchase Order

| Method     | Endpoint                                   | Description                                                                            | Role                     |
| ---------- | ------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------ |
| POST       | `/api/purchase-order/createPurchaseOrder`  | Create new PO                                                                          | "procurement", "manager" |
| GET        | `/api/purchase-order/getListPurchaseOrder` | Get all PO in system                                                                   | => All role              |
| PATCH      | `/api/purchase-order/submitPurchaseOrder`  | If you are owner you can submit PO after created with owner , Then you can approved PO | => Owner PO can submit   |
| PATCH      | `/api/purchase-order/approvePurchaseOrder` | Approve PO                                                                             | "finance", "manager"     |
| "finance", |

We have Approve log after Approve PO

# Inventory

| Method | Endpoint                              | Description                             | Role      |
| ------ | ------------------------------------- | --------------------------------------- | --------- |
| POST   | `/api/inventory/receivePurchaseOrder` | API to sock in product form PO approved | inventory |

# Report

| Method | Endpoint                         | Description                                                  | Role                 |
| ------ | -------------------------------- | ------------------------------------------------------------ | -------------------- |
| GET    | `/api/report/inventory-turnover` | Get data turnoverRate in inventory                           | "finance", "manager" |
| GET    | `/api/report/supplier-spending`  | Total spent per supplier, average PO value, grouped by month | "finance", "manager" |

# Audit Log

We can get data in Audit log with filter

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/audit-logs/getAuditLogs` | Get all data in audit log |
