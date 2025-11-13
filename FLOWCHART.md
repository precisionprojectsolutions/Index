```mermaid
graph TD
    %% Define Lanes (Swimlanes)
    subgraph Procurement
        P_START((Start))
        P_PO[A/Purchase Order (PO) Issued to Vendor]
        P_KOM[B/Kick-Off Meeting (KOM) & Baseline Finalization (P-1)]
        P_ReleaseShipment[H/Issue Release for Shipment (Path F)]
    end
... (rest of the code)

%% Start of Mermaid Flowchart
graph TD
    subgraph Procurement
        P_START((Start))
        P_PO[Purchase Order (PO) Issued to Vendor.]
        P_KOM[Kick-Off Meeting (KOM) & Baseline Finalization (P-1)]
        P_ReleaseShipment[Issue Release for Shipment (Path F)]
    end

    subgraph Vendor/Supplier
        V_SubmitVDP1[Submit Vendor Data Package (VDP 1 - Preliminary) (P-2)]
        V_Rework[Perform Rework/Re-tests]
        V_Fabrication[Initiate Manufacturing/Fabrication (Path D)]
    end

    subgraph Interface Manager
        IM_LogIMR[Log Interfaces in IMR (G-1)]
        IM_IMR_Closed{Are All Critical IMR Points Closed?}
        IM_Expedite[Expedite Interface Resolution (Path C)]
    end

    subgraph Engineering
        E_Review[VDP Technical Review (Single-Pass) (P-3)]
        E_VDP_Approved{Is VDP Technically Approved?}
        E_Revise[Issue Revise and Resubmit Comments. (Path A)]
        E_FinalVDP[Issue Final VDP Approval (AFC/IFC) (P-4)]
        E_ReleaseData[Release Interface-Critical Data (P-4)]
        E_FAT_Successful{Is FAT Successful?}
        E_NCR[Issue Non-Conformance Report (NCR) & Rework. (Path E)]
    end

    subgraph Construction/Site
        C_SiteWorks[Site Civil Works (Foundation/Structure) (P-5) -- CONCURRENT]
        C_Logistics[Logistics and Site Receipt (P-7)]
        C_Installation[Installation, Erection & Mechanical Completion (P-8)]
        C_End{Mechanical Completion Reached?}
    end

    subgraph Procurement/Engineering (Joint)
        PE_FAT[Arrange & Execute Factory Acceptance Test (FAT) (P-6)]
    end

    %% Flow connections
    P_START --> P_PO
    P_PO --> P_KOM
    P_KOM --> V_SubmitVDP1
    V_SubmitVDP1 --> IM_LogIMR
    IM_LogIMR --> E_Review
    E_Review --> E_VDP_Approved

    %% VDP Approval Decision (E_VDP_Approved)
    E_VDP_Approved -- NO (Path A) --> E_Revise
    E_Revise --> V_SubmitVDP1
    E_VDP_Approved -- YES (Path B) --> E_FinalVDP
    E_FinalVDP --> E_ReleaseData

    E_ReleaseData --> IM_IMR_Closed

    %% IMR Closed Decision (IM_IMR_Closed)
    IM_IMR_Closed -- NO (Path C) --> IM_Expedite
    IM_Expedite --> IM_IMR_Closed
    IM_IMR_Closed -- YES (Path D) --> V_Fabrication

    %% CONCURRENT PATH: Site works start after critical data is released (P-4)
    E_ReleaseData --> C_SiteWorks

    %% Synchronization point (M1) after Fabrication starts and Site Works begin, before FAT
    V_Fabrication --> M1[Synchronization Point]
    C_SiteWorks --> M1

    M1 --> PE_FAT

    %% FAT Decision (E_FAT_Successful)
    PE_FAT --> E_FAT_Successful
    E_FAT_Successful -- NO (Path E) --> E_NCR
    E_NCR --> V_Rework
    V_Rework --> PE_FAT %% Rework leads to re-test (FAT)
    E_FAT_Successful -- YES (Path F) --> P_ReleaseShipment

    P_ReleaseShipment --> C_Logistics
    C_Logistics --> C_Installation
    C_Installation --> C_End
%% End of Mermaid Flowchart
