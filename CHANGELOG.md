# Change Log - SPPAY User UI - Beta - 0.0.3

## 2022-11-26
### Added
* `METRONIC 8.1.5` Template.
* Basic Authentication [`Sign-in`]
* Cleaned up template and logos
  * `vue-m-message` - for notifications
  * `vue-json-pretty` - for dev work

## 2022-11-27
### Fixed
* Template errors
* Removed redundant images

## 2022-11-28
### Added
* `Acccounts`
  * Accounts Listing
  * Accounts Pagination
* `Transactions`
  * Transaction Listing
  * Transaction Pagination
  * View Single Transaction
* `SMS`
   * SMS report listing
   * Sender IDs listing
   * Add Sender ID
* `In-app Documentation`
  * introduction
  * accounts, api, authentication, permissions,profile, sms, support, transactions
* `Users`
  * Users Listing
  * Update User Details & Permissions
* `Campaigns`
  * Campaigns Listing
  * Add/Update Campaign
  
### Fixed
* API Service patch errors


## 2022-11-29
### Added
* `Transaction Batch`
  * Batch Upload Listing
  * Add/Confirm Batch upload
  * View Batch
* `Money request`
  * Money Request Listing
  * Add Money request
  * View Batch

## 2022-11-30
### Added
* `Invoice`
  * Invoice Listing
  * View/Add Invoice
  * Cancel/Fulfil Invoice

## 2022-12-01
### Added
* `Transactions`
  * Initiate transaction
* `KYC`
  * Update kyc details

### Fixed
* Typescript-eslint/no-explicit-any errors


## 2022-12-02
### Added
* `Guest Payments`
  * Generic collection page 
  * Invoice/Campaign Payment
  * Invoice Details
* `Sign Up`
  * New User Registration
* `Sign Up`
  * New User Registration

### Fixed
* TokenService bug fixes
* OnboardingService bug fixes


## 2022-12-03
### Added
* `CommonService` for generic endpoints
  * Get Institutions

### Fixed
* Moved getInstitutions endpoints to CommonService



## 2022-12-04
### Added
* `Accounts`
  * Get Accounts count

* `Transactions`
  * Get transaction statuses
  * Get transactions value
  * Get transactions count

* `Users`
  * Get users count

* `Permissions`
  * Get permissions
  
* `Profile`
  * Get User Details & Permissions

### Fixed
* `Campaign` vuex state bugs
* `MoneyRequest` fulfill payment ui changes
* `router` bug fixes
* `Auto Logout` - interceptors to logout when api has errors [401 & 409]


## 2022-12-08
### Added
* `Dashboard`
  * Get Accounts
  * Get Recent Transactions

### Fixed
* `User` bug fixes


## 2022-12-08
### Added
* `Menu`
  * User Menu/Icons

### Fixed
* `Accounts`
  * Default account label fix
  * UI fixes / logos
* `Site Links`
  * Router link refactoring
* `Transactions`
  * UI fixes
* `SMS`
  * Submit sender-id bug fix


## 2022-12-11
### Added
* `Pinia`
  * Added Pinia as state management library

### Changed
* `Vuex`
  * Removed vuex as state management library
* `Services`
  * separated services as guest, customer and admin
* `Store`
  * separated store as guest, customer and admin


## 2022-12-12
### Added
* `Admin`
  * Created admin folder structure
### Changed
* `Favicon`
  * changed sppay favicon



## 2022-12-13
### Added
* `Admin/Payment Method Mapping`
  * Manage Payment Method - Payment Library Mappings
* `Admin/SMS`
  * View sms reports
  * View Sender IDs
  * Add Sender ID
  
### Changed
* `Shared Functions`
  * Moved shared authentication and error pages to shared folder


## 2022-12-14
### Added
* `Switch User mode`
  * Change user from admin mode to normal user mode

### Changed
* `auth store`
  * Refactored auth store state

## 2022-12-15
### Added
* `Admin/Settings`
  * View/Add/Edit General Settings
  * View/Add/Edit Settings groups
  * View/Add/Edit Settings types
* `Admin/Accounts`
  * View Customer Listing
  * View/Add/Edit Account types
  * View/Add/Edit Account groups
  * View/Add/Edit Account limits
* `Admin/Customers`
  * View customer listing
  * View/Edit/Add Customer types
  * View/Add/Edit Customer groups
* `Admin/Transactions`
  * View transaction listing
  * View/Edit/Add transaction types
* `Admin/Notifications`
  * View/Edit/Add notification settings
  * View/Add/Edit notification activities
  * View/Add/Edit notification templates
* `Admin/KYC Settings`
  * View/Edit/Add general kyc settings
  * View/Add/Edit account specific kyc settings
  * View/Add/Edit customer specific settings

  
### Changed
* `Shared Functions`
  * Refactored router links


## 2022-12-16
### Added
* `Admin/Language`
  * language state management
  * language service
  * view/edit languages
* `Admin/Payment Methods`
  * payment methods state management
  * payment methods service
  * view/edit payment methods
* `Admin/Institution Types`
  * institutions types state management
  * institutions types service
  * view/edit institution type
* `Admin/Institutions`
  * institutions state management
  * institution service
  * view/edit institutions
* `Admin/Exchange Rates`
  * exchange rates state management
  * exchange rates service
  * view/edit exchange rate


## 2022-12-17
### Added
* `Admin/Account`
  * view account options
  * add/edit account
* `Admin/Customer Group`
  * edit customer group
* `Admin/Customer Type`
  * edit customer type
* `Admin/Notification Activity`
  * view/edit notification activity group
* `Admin/Transaction Type Accounts Mappings`
  * view/edit transaction type accounts mapping
* `Admin/Transaction Charges`
  * view/edit transaction charges
* `Admin/Transaction Commissions`
  * view/edit transaction commissions

## 2022-12-18
### Added
* `Guest invoice Payment`
  * view invoice
  * pay invoice
* `Guest Campaigin Payment`
  * view campaign
  * pay campaign



## 2022-12-19
### Added
* `Customer/Invoice`
  * Added shipping, billing address and po_number fields
  * Included shipping calculation

### Fixed
* `Customer/Money Request`
  * Show pagination meta only when we have records

* `Customer/Invoice`
  * New invoice bug fixes
 
### Changed
* `Customer/Money Request`
  * Changed submit request UI account number from text to dropdown
* `Authentication`
  * Changed UI to SPPAY colors

