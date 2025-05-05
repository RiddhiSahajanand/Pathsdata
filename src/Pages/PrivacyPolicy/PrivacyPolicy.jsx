
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import popular from "../../assets/images/popular.png";
import { toast } from 'react-toastify';

const PrivacyPolicy = () => {


    return (
        <section className='row justify-content-center align-items-center newsignin-section privacy-section'>
            {/* <div className="header privacy-screen"> */}
            <h4 className='privacytitle'>Privacy Policy</h4>

            <span className='privacy-main-title'>
                PATHSDATA (“we”, “our”, or “us”) is committed to protecting the privacy and security of our customers' data.
                This Privacy Policy outlines how we collect, use, store,
                and protect the personal information and infrastructure data of our clients,
                including enterprises, SMBs, and government organizations
                and built to empower you every step of the way.
            </span>
            <p className='privacy-main-title'>By using our services, you consent to the practices described in this policy.</p>
            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    1. Information We Collect
                </div>
                <span className='privacy-desc mb-3'>
                    We collect information in two primary categories:
                </span>
                <span className='privacy-subdesc '>
                    A. Cloud Environment Metadata
                </span>
                <span className='privacy-desc mb-3'>
                    To deliver, monitor, and support our infrastructure services, we collect technical information including but not limited to:
                </span>
                <ul class="custom-list">
                    <li>• Cloud account configurations (AWS, Azure, GCP, etc.).</li>
                    <li>• Resource identifiers, configurations, and usage metrics.</li>
                    <li>• IAM roles, policies, and access logs.</li>
                    <li>• Network topology, VPC/subnet data, and architecture diagrams</li>
                    <li>• Monitoring, tagging, and alert configuration metadata</li>
                </ul>
                <span className='privacy-desc mb-3'>
                    We do not access your end-user application data or content unless explicitly authorized for support or integration purposes.
                </span>
                <span className='privacy-subdesc'>
                    B. Customer Contact & Personal Information
                </span>
                <span className='privacy-desc mb-3'>
                    In the course of providing services, we collect the following personal and business data:
                </span>
                <ul class="custom-list">
                    <li>• Full name</li>
                    <li>• Job title or role</li>
                    <li>• Business email address</li>
                    <li>• Phone number</li>
                    <li>• Billing and invoicing address</li>
                    <li>• Account login credentials (where applicable)</li>
                    <li>• Communications and support interactions</li>
                    <li>• Usage activity related to our portal or APIs</li>
                </ul>
                <span className='privacy-desc'>
                    This information is collected via onboarding, support tickets, web forms, calls, contracts, and direct communication.
                </span>
            </div>
            <div className='privacy-list-view'>

                <div className="privacy-title mb-2 mb-md-3">
                    2. How We Use the Information
                </div>
                <span className='privacy-desc mb-3'>
                    We use the collected information to:
                </span>
                <ul class="custom-list">
                    <li>• Design, deploy, and maintain secure cloud infrastructure</li>
                    <li>• Provide technical support and respond to inquiries</li>
                    <li>• Improve service performance, reliability, and user experience</li>
                    <li>• Manage contracts, billing, and compliance requirements</li>
                    <li>• Communicate updates, service changes, or security notices</li>
                    <li>• Monitor platform usage for compliance and governance reporting</li>
                </ul>
                <span className='privacy-description'>
                    If you are a government client, our services can be delivered in compliance with  <span className='higlight-text'>FedRAMP, FISMA,</span>  or other applicable regulatory frameworks upon agreement.
                </span>
            </div>


            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    3. Legal Basis for Processing (GDPR)
                </div>
                <span className='privacy-desc mb-3'>
                    For customers in the EU/EEA, we process personal data based on:
                </span>
                <ul class="custom-list">
                    <li style={{ display: '' }}>• &nbsp; <span className='higlight-text'>Contractual necessity – </span> &nbsp; to provide you services</li>
                    <li style={{ display: '' }}>• &nbsp; <span className='higlight-text'>Legitimate interest – </span>  &nbsp; to improve security and performance</li>
                    <li style={{ display: '' }}>• &nbsp; <span className='higlight-text'> Legal obligation – </span>&nbsp; to meet regulatory requirements</li>
                    <li style={{ display: '' }}>• &nbsp; <span className='higlight-text'> Consent – </span>&nbsp; where explicitly required (e.g., marketing)</li>
                </ul>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    4. Data Security
                </div>
                <span className='privacy-desc mb-3'>
                    We implement industry best practices to protect data, including:
                </span>
                <ul class="custom-list">
                    <li>• Encryption at rest and in transit</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Multi-factor authentication for internal systems</li>
                    <li>• Network and perimeter security monitoring</li>
                    <li>• Secure software development lifecycle (SDLC)</li>
                    <li>• Employee security training and background checks</li>

                </ul>
                <span className='privacy-desc'>
                    Security compliance frameworks (e.g., SOC 2, ISO 27001) may be applicable depending on the customer and engagement.
                </span>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    5. Data Sharing and Sub-Processors
                </div>
                <span className='privacy-desc mb-3'>
                    We do not sell or lease your personal data or infrastructure data.
                </span>
                <span className='privacy-desc mb-3'>
                    We may share data with vetted sub-processors under strict contractual obligations, solely for purposes of delivering and supporting our services. A list of sub-processors is available upon request and may include:
                </span>
                <ul class="custom-list">
                    <li>• Cloud service providers (e.g., AWS)</li>
                    <li>• Managed support platforms</li>
                    <li>• CRM and ticketing systems</li>
                    <li>• Secure logging and monitoring tools</li>
                </ul>
                <span className='privacy-description'>
                    We will enter into <span className='higlight-text'>Data Processing Agreements (DPA)</span>{' '} as required under GDPR or enterprise/government contracts.
                </span>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    6. Data Retention
                </div>
                <span className='privacy-desc mb-3'>
                    We retain personal and cloud metadata only as long as necessary:
                </span>
                <ul class="custom-list">
                    <li>• To fulfill the purpose for which it was collected</li>
                    <li>• To comply with legal, regulatory, or contractual obligations</li>
                    <li>• Or until termination of our agreement and confirmed deletion</li>
                </ul>
                <span className='privacy-desc'>
                    Secure deletion methods and retention policies are available upon request for compliance reviews.
                </span>
            </div>


            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    7. Your Rights
                </div>
                <span className='privacy-desc mb-3'>
                    You have the following rights regarding your personal information:
                </span>
                <ul class="custom-list">
                    <li>• Right to access your data</li>
                    <li>• Right to access your data</li>
                    <li>• Right to delete personal data</li>
                    <li>• Right to restrict or object to processing</li>
                    <li>• Right to receive a copy of your data (data portability)</li>
                    <li>• Right to withdraw consent at any time (where applicable)</li>

                </ul>
                <span className='privacy-description'>
                    Please email&nbsp;<a href="mailto:dshah@pathsdata.com" className='text-white'>dshah@pathsdata.com</a>&nbsp;to exercise your rights or file a request on our website.
                </span>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    8. International Transfers
                </div>
                <span className='privacy-desc'>
                    We may store and process data in the United States or other jurisdictions. If data is transferred outside the EU/EEA, we use Standard Contractual Clauses (SCCs) or equivalent safeguards to ensure compliance.
                </span>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    9. Government and Compliance Considerations
                </div>
                <span className='privacy-desc mb-3'>
                    PATHSDATA can support engagements requiring:
                </span>
                <ul class="custom-list">
                    <li>• FedRAMP Moderate/High readiness:</li>
                    <li>• FISMA compliance</li>
                    <li>• U.S. Government cloud regions (GovCloud, GCC High)</li>
                    <li>• Data localization as per customer-specific contracts</li>
                    <li>• ITAR, CJIS, and other frameworks upon mutual agreement</li>
                </ul>
                <span className='privacy-description'>
                    We sign additional agreements, including<span className='higlight-text'>BAAs, DPAs,</span>  and  <span className='higlight-text'> security addendums </span>, with qualified entities.
                </span>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    10. Changes to This Policy
                </div>
                <span className='privacy-desc'>
                    We may update this Privacy Policy as our services and legal obligations evolve. The most current version will always be posted on our website.
                </span>
                <span className='privacy-desc'>
                    We will notify customers of material changes via email or account notification.
                </span>
            </div>

            <div className='privacy-list-view'>
                <div className="privacy-title mb-2 mb-md-3">
                    11. Contact Us
                </div>
                <span className='privacy-bottom'>
                    PATHSDATA Privacy Team
                </span>
                <span className='privacy-bottom'>
                    Email: &nbsp; <a href="mailto:dshah@pathsdata.com" className='text-white'>dshah@pathsdata.com</a>
                </span>
                <span className='privacy-bottom'>
                    Website: &nbsp; <a href="https://www.pathsdata.com" target="_blank" className='text-white' rel="noopener noreferrer">www.pathsdata.com</a>
                </span>
            </div>
            {/* </div> */}
        </section >
    )
}

export default PrivacyPolicy