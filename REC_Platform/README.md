# Renewable Energy Certification Platform

Welcome to the technical documentation for the second week of the Renewable Energy Certification Platform project. In this week's update, our primary emphasis has been on enhancing the functionality and enriching the features of the platform's core modules: the Registry, Issuer, and Exchange modules.

## Table of Contents
- [Modules](#modules)
    - [Registration Module](#registration-module)
    - [Issuer Module](#issuer-module)
    - [Exchange Module](#exchange-module)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Modules

### Registration Module

To engage with actions on the Lightency marketplace, registration is a prerequisite. This ensures that actions like certificate requests and claims are linked to specific entities, maintaining accountability and preventing duplicate counts. Similar to the real world, Lightency introduces the concept of organizations within the marketplace. These registered entities possess multiple user accounts with varying permissions, typically aligned with roles and responsibilities. User accounts often represent employees or departments, while devices—usually electricity generators—must also be registered. This registration instills trust in the certificates they generate. While browsing device lists or posted supply and demand, registration isn't mandatory. However, interaction with the system necessitates registration.

#### Organizations

Organization and Admin

- Users and permissions in Lightency are tied to digital entities known as organizations.
- Each organization is led by an admin user responsible for providing mandatory registration information via a user interface.

#### Registration and User Management

- After successful registration, the admin user can manage users within the organization.
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693939680/f1_snfjil.png)
- Admins can invite new users, assign specific permissions, and oversee user accounts.
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693939680/f2_wk7oar.png)
- Organizations are typically companies that define permissions for their employees' user accounts.

#### User Engagement and Authentication

- To ensure authorized system interaction, users must be associated with an organization, be lead users, or complete a KYC process.
- Integration with a certificate registry requires organizations owning generation devices to authenticate as active registry members.

#### Interaction and Membership

- For users to perform actions like device management or certificate requests, their organization needs confirmed active registry membership.
- Any suspension or termination of organization membership prevents associated users from engaging in the Lightency marketplace.

#### Users

User and Account Management in Lightency

- Users need a Lightency account to manage users, and devices, request certificates, post supplies and demands, and claim certificates.
- The main account within an organization is the lead user, responsible for user management and setting permissions.
- Lead users assign roles (e.g., device manager, trader) to created users based on their organizational responsibilities.

#### Automatic Association and KYC

- Users created by the organization's lead user are automatically linked to the organization.
- No additional KYC process is required for users associated with the lead user.

#### Integration with Certificate Registry

- In integration with a certificate registry, synchronization between systems ensures user alignment.
- Registering a lead user in Lightency triggers a corresponding application in the certificate registry.
- Users with an existing certificate registry account can import it into Lightency securely through authentication.

#### Secure Account Import

- Users authenticate themselves using the certificate registry's authentication system.
- Authenticated information is transferred to Lightency for account verification.
- Authentication token and registry ID in Lightency confirm users' identities.

#### Ensured Validity and Interaction

- Authentication token and registry ID in Lightency validate actions' legitimacy.
- Actions performed in Lightency remain valid in the certificate registry.

#### Buyer Organizations and Simplified Interaction

- Buyer organizations don't require synchronization with the certificate registry.
- Lightency serves as the sole platform for their user accounts.
- Buyers only need to register with Lightency to engage in the marketplace.
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693939682/f3_echxfb.png)

#### Devices

Registering Generation Devices with Lightency

- Devices must be registered with Lightency to link certificates to specific devices and ensure accurate characteristics.
- Certificates inherit traits from generation devices, making device certainty crucial.

#### Traceability and Preventing Misconduct

- Registering devices allows traceability and prevents misrepresentation.
- Registered devices provide credible generation evidence, ensuring accurate certificates.

#### Integration with Certificate Registry

- Full integration with a certificate registry mandates adherence to its registration process.
- Only devices meeting the rigorous registry requirements can request certificates in Lightency.
- Registry-approved devices often undergo on-site visits by independent verifiers.

#### Simple Device Registration

- Device registration details and documents can be provided via the user interface.
- If integrated with a compliance registry, Lightency forwards the registration to the registry.
- The compliance registry manages its registration process directly with the user.

#### Importing Devices

- Devices registered with the compliance registry need to be imported into Lightency.
- Import restricted to authenticated active members of the certificate registry.
- Ensures only verified device owners import and claim certificates in Lightency.

#### Requirements

- All users have to either be registered lead users, be associated with a registered organization, or be authenticated through a certificate registry
- Only registered organizations/lead users can create new user accounts
- Only registered organizations/lead users can set user permissions
- Only registered users with the correct permissions can register and own devices
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693968001/n1_mlqvqi.png)
- Only registered users with the correct permissions can request certificates
- Only registered users with the correct permissions can trade certificates
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693966846/f6_hplynn.png)
- Only registered users with the right permissions can claim certificates
- Users can only request certificates for registered devices

### Issuer Module

Issuing certificates

Certificates are the outcome of verifying specific renewable electricity amounts. Identification is based on the device and time frame. Certificates include volume and owner details.

Once issued, certificates are tradable commodities, with ownership clarity being important. Only the local issuer can create new certificates. Certificates can't be lost; they always have an owner.

The issuer has the discretion to suspend certificates, except claimed ones. New certificates can replace old suspended ones to rectify mistakes.

Issuance methods vary by region and local issuer processes. Certificates are issued via device owner requests or automated local issuer processes.

#### Requesting certification of generation evidence

- Varies by standards.
- Some need impartial party documents (DSO/TSO confirmation).
- Local issuer evidence results in automatic certificates for device owners.

#### Ideal Evidence Source

- The metering device with data directly on the blockchain.

#### Issuance in Lightency Marketplaces

- User interface for issuance and generation of evidence.
- Lightency registers the request and forwards it to the certificate registry for verification.

#### Evidence Submission Support

- Lightency supports evidence submission.
- Verification focus is standard-specific.
- Checks include documentation, on-site inspections, and preventing multiple submissions (e.g. green certificates and carbon offsets for the same MWh from the same device in the same period).

#### Approving Certification Request in Lightency

- Local issuer or certificate registry verifies generation evidence.
- Approval is needed for certificate issuance.

#### Issuing Certificates

- New certificates issued to the device owner's Lightency account.
- Public issuance or privacy-preserving options available.

#### Privacy-Preserving Issuance

- Device owners can choose private issuance.
- Privacy techniques mask volume.
- Issuer retains information to prevent double-spending.

#### Requirements

Permissions

- Only the issuer can mint new certificates
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693967106/f7_snx7da.png)
- Only the issuer can suspend certificates
- The issuer can mint new certificates only for devices in its region
- The issuer can suspend certificates only for devices in its region
- One region can have multiple issuers
- The same issuer can be in multiple regions
- Only the owner of a certificate can transfer or claim the certificate
- No one can suspend or transfer claimed certificates

Data

- Certificates can be issued only for a period without previously issued certificates, excluding suspended certificates. This means that the issuer can issue new certificates “in place” of old suspended certificates.
- The number of newly issued certificates has to be greater than zero

### Transferring certificates between users

#### Certificate Transfers in Lightency

- Users transfer certificates for various reasons beyond trading.
- Organizations may have dedicated accounts for claiming or gifting.

#### Scenarios for Transfers

- Traders transfer to dedicated claiming accounts.
- Corporates gift certificates to suppliers and more.

#### Differentiating Transfers from Trading

- Transfers don't involve value exchange; certificates are moved without value change.
- No confusion with trading; certificates shifted between accounts.

#### Transferring Public Volumes

- Public volume certificates can be directly transferred between users.

#### Transferring Hidden Volumes

- Private volume certificates need special transfer processes.
- Options: Making private certificates public for transfer.
- Alternatively, issuer verification ensures private transfer validity.
- The recipient becomes the owner, and can sell or claim certificates.

#### Requirements

- Users should be able to transfer certificates to any registered user
  ![Alt Text](https://res.cloudinary.com/dtrbcyuox/image/upload/v1693967291/f8_vyafym.png)
- Users should only be able to transfer the number of certificates that they own or less
- Users should not be able to double spend their certificates
- Users should be able to make their private certificates public
- Users should be able to make their public certificates private
- Users should be able to transfer certificates without disclosing volume information

### Claiming certificates

#### Claimed State Basics

- Represents the certificate's final lifecycle stage.
- Goal is to lock certificates so they remain in one account, ensuring they can't be moved, unclaimed, suspended, or altered.
- Used primarily for sustainability reporting.

#### Claiming Process in Lightency

- Certificates are claimed via a user interface.
Once claimed
- Owners can't perform actions or change ownership.
- Issuers can't suspend the certificate.
- Certificates previously private become public, ensuring transparency.

#### Public Access and Auditing

- All claimed certificates are publicly viewable.
- Allows for thorough auditing, verifying sustainability reporting accuracy.

#### Integration with Certificate Registries

- Claiming in Lightency depends on approval from the certificate registry.
- Claiming request in Lightency triggers a transfer in the registry, which, if successful, updates the certificate's status to "claimed" in Lightency.

#### Requirements

- Only the certificate owner can claim it.
- Claimed certificates are immutable.
- Third parties must have view access to an organization's claimed certificates.
- Claiming in Lightency is subject to certificate registry approval.
- Suspensions are not allowed for claimed certificates.

### Exchange Module

The exchange module is part of the Lightency SDK that enables efficient and transparent order book trading between sellers and buyers. It integrates with the issuer module to allow for the trading of RECs (Renewable Energy Certificates) on the blockchain.

#### Orders

##### Create Ask

On Lightency, sellers create "asks" to offer specific volumes of RECs at defined prices, tied to owned RECs. Asks are displayed on the Exchange with price, volume, and REC details. User identities remain confidential, and unmatched asks can be canceled, returning assets for withdrawal or new bids. The exchange operator manages ownership and matching.

###### Requirements
- Every ask has to be connected to exactly one renewable energy device
- The ask volume cannot be larger than the asset volume in the active part of the Exchange user account
- Once created, the ask has to appear on the Exchange without disclosing any user information
- The asset volume corresponding to the ask has to be moved to the locked part of the Exchange user account
- Only asks that have not been matched or bought can be canceled
- An ask can only be reactivated if the user has a matching amount of asset volume in the active part of the user Exchange account

##### Create Bid

On Lightency, buyers post "bids" to express interest in buying RECs on the Exchange. Unlike asks, bids are not linked to specific RECs but are defined by buyer needs. Bids feature a maximum price, volume, and a "product" requirement specification. The product specifies REC characteristics for matching, such as device type, vintage, location, and generation time frame. Users can create non-binding "notifications'' with the same criteria, excluding volume. Notifications increase market transparency. Bids and notifications are anonymous on the Exchange. Unmatched bids stay visible for potential future matches. Buyers can cancel bids or notifications. Bids cannot be updated; changes require bid cancellation and re-creation.

###### Requirements

- Only registered users can create a bid
- Buyers have to specify maximum price and volume to create a bid
- Buyers should be able to define device type, device vintage, location or grid region, and time frame, if not selected the system default should be “any”
- Buyers have to specify a maximum price to create a notification
- When created, the bid with the right specifications should appear on the Exchange
- Only bids that have not been matched can be removed
- When removed, the bid should disappear from the Exchange

##### Create Demand

In Lightency, buyers with recurring REC demands can define such demands in the system. Creating a demand triggers automatic bid creation with the same criteria at defined intervals. For instance, a monthly demand with a set volume, price, and product generates a bid every month. Each bid links back to the originating demand. Users set demand duration and its start-end dates. After a demand's duration, a new demand is needed for continued automatic bids. Generation time frame complexity is addressed by linking it to the demand's time frame. Demands don't require cancellation; archived or paused options exist for managing them.

###### Requirements

- Only registered users can create a demand
- The system should automatically create a bid once every defined demand time frame with the right specifications
- The system should periodically create bids from the start until the end of the demand duration

##### Direct Buy

In Lightency, buyers can opt for direct REC purchases from asks on the Exchange, eliminating the need to create bids. This is especially useful when an ask matches their needs or when they're notified via configured alerts. Direct buying streamlines the process by allowing one-click purchasing from fitting asks, avoiding bid creation and matching complexities. Direct buy triggers a bid creation mirroring the ask's specs, matched through the same system. Created bid retains information about the direct buy for traceability.

###### Requirements

- Only registered users should be able to direct buy
- Direct buying should create a bid with criteria taken one to one from the asks characteristics

#### Matching Engine

##### Matching criteria

Price

- Seller's asking price vs. Buyer's maximum price.
- A match occurs if the asking price ≤ the bid's max price.
- The price field is mandatory; "any" price is not allowed.

Device Type

- Refers to the energy generation device.
- Hierarchy present, e.g., "Wind" with children "Wind Onshore" and "Wind Offshore".
- Asks always use the lowest level (specific) device type, bids can use any.
- Match if the bid's device type is the same or higher level than the ask's.

Device Vintage

- Indicates when the generation device began operation.
- Match if the ask's vintage year falls within the bid's specified timeframe.
- "Any" vintage signifies no restriction.

Location/Grid Region

- The region where the generation device is connected.
- Some buyers prioritize local renewable energy projects.
- Match if the bid's region aligns or is broader than the ask's region.
- "Any" region indicates no restrictions on location.

Generation Time Frame

- The time period when the energy was generated.
- Reflects the actual grid mix during energy consumption.
- Match if the ask's generation time falls within the bid's specified range.
- "Any" timeframe means no restrictions, but certain standards may invalidate older RECs.

---

For any inquiries or assistance, feel free to reach out to us.
