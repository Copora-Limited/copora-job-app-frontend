import React, { useState, useEffect } from "react";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const AgreementConsentForm = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();

  const applicationNo = session?.user?.applicationNo;
  const [isMounted, setIsMounted] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [agreementDetails, setAgreementDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    userConsent: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const fetchBankDetails = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/agreement-consent/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bank details.");
        }

        const data = await response.json();
        console.log(data);
        setAgreementDetails(data);
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setAddress(data.address || "");
        onChange(data);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching bank details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBankDetails();
  }, [applicationNo, token, hasFetchedData, onChange]);

  const handleChange = (field, value) => {
    const updatedAgreementState = { ...agreementDetails, [field]: value };
    setAgreementDetails(updatedAgreementState);
    onChange(updatedAgreementState); // Notify parent component
  };

  function RenderContent({ index, content }) {
    return (
      <>
        <div className="md:flex hidden items-center text-[16px] text-black">
          {index}{" "}
          ...................................................................................................................{" "}
          {content}
        </div>
        <div className="md:hidden flex items-center text-[14px] text-black">
          {index} ........................................ {content}
        </div>
      </>
    );
  }

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div className="w-[100%] mx-auto font-azoSansLight">
        {/* Agreement Content */}
        <div className="mt-3">
          <h5 className="md:text-[18px] text-[16px] font-medium text-primary text-center">
            Terms of engagement for temporary workers
          </h5>
          <p className="md:text-[14px] text-[12px] text-primary text-center">
            between
          </p>
          <p className="md:text-[14px] text-[12px] text-primary text-center font-azoSansMedium">
            COPORA LTD
          </p>
          <p className="md:text-[14px] text-[12px] text-primary text-center">
            and
          </p>
          <p className="md:text-[14px] text-[12px] text-primary text-center font-azoSansMedium">
            {firstName || "First Name"} {lastName || "Last Name"}
          </p>
        </div>

        <div className="w-full mt-5 flex flex-col gap-3 ">
          <h4 className="text-center text-[14px] font-medium">
            CONTENTS CLAUSE
          </h4>
          <RenderContent index="1." content="Interpretation 3" />
          <RenderContent index="2." content="The agreement 5" />
          <RenderContent index="3." content="Assignments 6" />
          <RenderContent
            index="4."
            content="Temporary worker's obligations 7"
          />
          <RenderContent index="5." content="Remuneration 8" />
          <RenderContent index="6." content="Time sheets 8" />
          <RenderContent index="7." content="Annual leave 8" />
          <RenderContent index="8." content="Sickness absence 9" />
          <RenderContent index="9." content="Termination 9" />
          <RenderContent
            index="10."
            content="Intellectual property rights 10"
          />
          <RenderContent index="11." content="Confidentiality 10" />
          <RenderContent index="12." content="Data protection 10" />
          <RenderContent index="13." content="Warranties and indemnities 11" />
          <RenderContent index="14." content="No partnership or agency 11" />
          <RenderContent index="15." content="Entire agreement 12" />
          <RenderContent index="16." content="Third Party rights 12" />
          <RenderContent index="17." content="Notices 12" />
          <RenderContent index="18." content="Severance 13" />
          <RenderContent index="19." content="Governing law 13" />
          <RenderContent index="20." content="Jurisdiction 13" />
          <RenderContent index="21." content="Disclaimer 13" />
        </div>

        <div className="mt-5 ">
          THIS AGREEMENT is dated
          <br />
          <br />
          PARTIES
          <br /> <br />
          (1) COPORA LTD incorporated and registered in England and Wales with
          company number 09864017 whose registered office is at 71-75 Shelton
          Street, Covent Garden, London, England, WC2H 9JQ (Employment
          Business).
          <br /> <br />
          (2) {firstName || "First Name"} {lastName || "Last Name"} of{" "}
          {address || "Address"}
          <br />
          <br />
          <span className="font-azoSansMedium">AGREED TERMS</span>
          <br /> <br />
          1. INTERPRETATION
          <br /> <br />
          1.1 The definitions and rules of interpretation in this clause apply
          to this agreement.
          <br /> <br />
          Assignment: the temporary services to be carried out by the Temporary
          Worker for the Client, as more particularly described in clause 3 and
          in the Assignment Confirmation.
          <br /> <br />
          AWR 2010: the Agency Workers Regulations 2010 (SI 2010/93).
          <br /> <br />
          Assignment Confirmation: written confirmation of the detail of a
          particular Assignment to be given to the Temporary Worker on
          acceptance of that Assignment.
          <br /> <br />
          Business Day: a day other than a Saturday, Sunday or public holiday
          when banks in England are open for business.
          <br /> <br />
          Calendar Week: shall have the meaning in regulation 7(4) of the AWR
          2010.
          <br /> <br />
          Client: the person, firm, partnership, company or Group company (as
          the case may be) to whom the Temporary Worker is Introduced or
          supplied.
          <br /> <br />
          Conduct Regulations 2003: the Conduct of Employment Agencies and
          Employment Business Regulations 2003 (SI 2003/3319).
          <br /> <br />
          Confidential Information: information in whatever form (including
          without limitation, in written, oral, visual or electronic form or on
          any magnetic or optical disk or memory and wherever located) relating
          to the business, customers, products, affairs and finances of the
          Client, the Employment Business for the time being confidential to the
          Client, the Employment Business [and trade secrets including, without
          limitation, technical data and know-how relating to the business of
          the Client or the Employment Business or of any Group company or any
          of its suppliers, customers, agents, distributors, shareholders,
          management or business contacts, including (but not limited to)
          information that the Temporary Worker creates, develops, receives or
          obtains in connection with the Assignment, whether or not such
          information (if in anything other than oral form) is marked
          confidential.
          <br /> <br />
          Engage: the employment of a Temporary Worker or the engagement
          directly or indirectly through any employment business other than
          through the Employment Business (whether for a definite or indefinite
          period) of a Temporary Worker as a direct result of any Introduction
          or Assignment to the Client and the term Engaged shall be construed
          accordingly.
          <br /> <br />
          Group: in relation to a company, that company, each and any subsidiary
          or holding company of that company. Holding company: has the meaning
          given in clause 1.5. 3<br /> <br />
          Intellectual Property Rights: patents, rights to inventions, copyright
          and related rights, moral rights, trade marks, trade names and domain
          names, rights in get-up, rights in goodwill or to sue for passing off,
          rights in designs, rights in computer software, database rights,
          rights in confidential information (including know-how and trade
          secrets) and any other intellectual property rights, in each case
          whether registered or unregistered and including all applications (or
          rights to apply) for, and renewals or extensions of, such rights and
          all similar or equivalent rights or forms of protection which may now
          or in the future subsist in any part of the world.
          <br /> <br />
          Introduce: the provision to the Client of information by the
          Employment Business [by way of a curriculum vitae or in such format as
          the Client may from time to time require] which identifies the
          Temporary Worker and Introduction and Introduced shall be construed
          accordingly.
          <br /> <br />
          Other Qualifying Period Payment: any remuneration payable to the
          Temporary Worker (other than the Qualifying Period Rate of Pay), which
          is not excluded by virtue of regulation 6 of the AWR 2010, such as any
          overtime, shift premium, commission or any bonus, incentive or rewards
          which are directly attributable to the amount or quality of work done
          by a Temporary Worker and are not linked to a financial participation
          scheme (as defined by the AWR 2010).
          <br /> <br />
          Qualifying Period: 12 continuous Calendar Weeks, as defined in
          regulation 7 of the AWR 2010, subject always to regulations 8 and 9 of
          the AWR 2010.
          <br /> <br />
          Qualifying Period Rate of Pay: the rate of pay that will be paid to
          the Temporary Worker on completion of the Qualifying Period, if this
          rate is higher than the Rate of Pay. Such rate will be paid for each
          hour worked during an Assignment (to the nearest quarter hour) weekly
          in arrears, subject to any deductions that the Employment Business is
          required to make by law and to any deductions that the Temporary
          Worker has specifically agreed can be made.
          <br /> <br />
          Rate of Pay: the rate of pay that will be paid to the Temporary Worker
          prior to completion of the Qualifying Period. Such rate will be paid
          for each hour worked during an Assignment (to the nearest quarter
          hour) weekly in arrears, subject to any deductions that the Employment
          Business is required to make by law and to any deductions which the
          Temporary Worker has specifically agreed can be made.
          <br /> <br />
          Relevant Period: shall have the meaning set out in regulation 10(5)
          and (6) of the Conduct Regulations 2003. Relevant Terms and
          Conditions: the relevant terms and conditions as defined in regulation
          6 of the AWR 2010 that apply once the Temporary Worker has completed
          the Qualifying Period.
          <br /> <br />
          Required Assignment Information: shall have the meaning set out at
          clause 3.3.
          <br /> <br />
          Subsidiary: has the meaning given in clause 1.5.
          <br /> <br />
          Temporary Worker: a worker Introduced and supplied by the Employment
          Business to the Client to provide services to the Client not as an
          employee of the Client, who is deemed to be an agency worker for the
          purposes of regulation 3 of the AWR 2010.
          <br /> <br />
          Temporary Work Agency: shall have the meaning set out in regulation
          4(1) of the AWR 2010. Vulnerable Person: shall have the meaning set
          out in regulation 2 of the Conduct Regulations 2003. WTR 1998: the
          Working Time Regulations 1998 (SI 1988/1833).
          <br /> <br />
          1.2 A person includes a natural person, corporate or unincorporated
          body (whether or not having separate legal personality).
          <br /> <br />
          4<br />
          <br />
          1.3 The Schedules form part of this agreement and shall have effect as
          if set out in full in the body of this agreement. Any reference to
          this agreement includes the Schedules.
          <br /> <br />
          1.4 A reference to a company shall include any company, corporation or
          other body corporate, wherever and however incorporated or
          established.
          <br /> <br />
          1.5 A reference to a holding company or a subsidiary means a holding
          company or a subsidiary (as the case may be) as defined in section
          1159 of the Companies Act 2006 [and a company shall be treated, for
          the purposes only of the membership requirement contained in sections
          1159(1)(b) and (c), as a member of another company even if its shares
          in that other company are registered in the name of (a) another person
          (or its nominee) by way of security or in connection with the taking
          of security, or (b) its nominee]. In the case of a limited liability
          partnership which is a subsidiary of a company or another limited
          liability partnership, section 1159 of the Companies Act 2006 shall be
          amended so that: (a) references in sections 1159(1)(a) and (c) to
          voting rights are to the members' rights to vote on all or
          substantially all matters which are decided by a vote of the members
          of the limited liability partnership; and (b) the reference in section
          1159(1)(b) to the right to appoint or remove a majority of its board
          of directors is to the right to appoint or remove members holding a
          majority of the voting rights.
          <br />
          1.6 A reference to a statute or statutory provision is a reference to
          it as amended, extended or re-enacted from time to time.
          <br />
          1.7 A reference to a statute or statutory provision shall include all
          subordinate legislation made from time to time under that statute or
          statutory provision.
          <br />
          1.8 A reference to writing or written includes fax and e-mail.
          <br />
          1.9 Any obligation on a party not to do something includes an
          obligation not to allow that thing to be done. 1.10 A reference to
          this agreement or to any other agreement or document referred to in
          this agreement is a reference to this agreement or such other
          agreement or document as varied or novated (in each case, other than
          in breach of the provisions of this agreement) from time to time.
          <br />
          1.11 References to clauses and Schedules are to the clauses and
          Schedules of this agreement and references to paragraphs are to
          paragraphs of the relevant Schedule.
          <br />
          1.12 Any words following the terms including, include, in particular,
          for example or any similar expression shall be construed as
          illustrative and shall not limit the sense of the words, description,
          definition, phrase or term preceding those terms.
          <br />
          2. THE AGREEMENT
          <br />
          2.1 These terms set out the entire agreement between the Employment
          Business and the Temporary Worker for the supply of services to the
          Client and shall govern all Assignments undertaken by the Temporary
          Worker (including, for the avoidance of doubt, where the Temporary
          Worker undertakes an Assignment without having signed these terms). No
          contract shall exist between the Employment Business and the Temporary
          Worker between Assignments.
          <br />
          2.2 For the avoidance of doubt, this agreement constitutes a contract
          for services and not a contract of employment between the Employment
          Business and the Temporary Worker or the Temporary Worker and the
          Client. 2.3 For the purposes of the Conduct Regulations 2003, the
          Employment Business acts as an Employment Business in relation to the
          Introduction and supply of the Temporary Worker to the Client.
          <br />
          <br />
          3. ASSIGNMENTS
          <br />
          <br />
          3.1 The Employment Business will endeavour to obtain suitable
          Assignments for the Temporary Worker to perform the type of work
          specified in the Assignment Confirmation. The Employment Business is
          not obliged to offer an Assignment to the Temporary Worker and the
          Temporary Worker shall not be obliged to accept any Assignment offered
          by the Employment Business.
          <br />
          3.2 The Temporary Worker acknowledges that the nature of temporary
          work means that there may be periods when no suitable work is
          available. The Temporary Worker agrees that suitability of an
          Assignment shall be determined solely by the Employment Business and
          that the Employment Business shall incur no liability to the Temporary
          Worker should it fail to offer Assignments of the type of work
          specified in the Assignment Confirmation or any other work.
          <br />
          3.3 Except as provided below, at the same time as an Assignment is
          offered to the Temporary Worker, the Employment Business shall provide
          the Temporary Worker with the following information (the Assignment
          Confirmation):
          <br />
          (a) the identity of the Client, and if applicable the nature of its
          business;
          <br />
          (b) the date the Assignment is to commence and the duration or likely
          duration of the Assignment;
          <br />
          (c) the position which the Client seeks to fill, including the type of
          work the Temporary Worker in that position would be required to do,
          the location at which, and the hours during which, the Temporary
          Worker would be required to work;
          <br />
          (d) the Rate of Pay and any expenses payable by or to the Temporary
          Worker;
          <br />
          (e) any risks to health and safety known to the Client in relation to
          the Assignment and the steps the Client has taken to prevent or
          control such risks; and
          <br />
          (f) the experience, training, qualifications and any authorisation
          which the Client considers are necessary or which are required by law
          or a professional body for the Temporary Worker to possess in order to
          work in the Assignment.
          <br />
          3.4 Where the Assignment Confirmation is not given in paper form or by
          electronic means, the Employment Business shall confirm it in writing
          or electronically as soon as possible and in any event will endeavour
          to confirm no later than the end of the third Business Day following
          the day on which the Assignment was offered to the Temporary Worker.
          <br />
          3.5 Unless the Temporary Worker requests otherwise, clause 3.3 will
          not apply where the Temporary Worker is being Introduced or supplied
          to the Client to work in the same position as one in which the
          Temporary Worker has previously been supplied within the previous five
          Business Days and the Assignment Confirmation (with the exception of
          the date or likely duration of the Assignment) is the same as that
          already given to the Temporary Worker.
          <br />
          3.6 Subject to clause 3.5 and clause 3.7, where the Assignment is
          intended to last for five consecutive Business Days or less and the
          Assignment Confirmation has previously been given to the Temporary
          Worker and remains unchanged, the Employment Business shall provide
          written confirmation of the identity of the Client and the likely
          duration of the Assignment.
          <br />
          3.7 Where the provisions of clause 3.6 have been met but the
          Assignment extends beyond the intended five consecutive Business Day
          period, the Employment Business shall provide the remaining Assignment
          Confirmation to the Temporary Worker in paper or electronic form
          within eight Business Days of the start of the Assignment or by the
          end of the Assignment, if sooner.
          <br />
          4. TEMPORARY WORKER'S OBLIGATIONS
          <br />
          <br />
          4.1 The Temporary Worker is not obliged to accept any Assignment
          offered by the Employment Business. If the Temporary Worker does
          accept an Assignment, the Temporary Worker shall:
          <br />
          (a) (b) (c) (d) (e) (f) (g) co-operate with the Client's reasonable
          instructions and accept the direction, supervision and control of any
          responsible person in the Client's organisation;
          <br />
          observe any relevant rules and regulations of the Client's
          organisation (including normal hours of work) of which the Temporary
          Worker has been informed or of which the Temporary Worker should be
          reasonably aware; co-operate with the Employment Business in the
          completion and renewal of all mandatory checks;
          <br />
          where the Assignment involves working with any Vulnerable Persons,
          provide the Employment Business with copies of any relevant
          qualifications or authorisations including an up-to-date Disclosure
          and Barring Service certificate and two references which are from
          persons who are not related to the Temporary Worker; take all
          reasonable steps to safeguard their own health and safety and that of
          any other person who may be present or be affected by their actions on
          the Assignment and comply with the health and safety policies of the
          Client;
          <br />
          not engage in any conduct detrimental to the interests of the
          Employment Business or the Client;
          <br />
          comply with all relevant statutes, laws, regulations and codes of
          practice from time to time in force in the performance of the
          Assignment and applicable to the Client's business, including without
          limitation, any equal opportunities or non-harassment policies.
          <br />
          4.2 If the possible before the commencement of each such Assignment
          and during each Assignment (as appropriate) and at any time at the
          Employment Business' request, the Temporary Worker undertakes to: (a)
          inform the Employment Business in writing or electronically of any
          Calendar Weeks whether before the date of commencement of the relevant
          Assignment or during the relevant Assignment in which the Temporary
          Worker has worked in the same or a similar role with the Client,
          direct or via any third party;
          <br />
          (b) provide the Employment Business in writing or electronically with
          all the details of such work, including (without limitation) details
          of when, where and the period(s) during which such work was
          undertaken, the role performed and any other details requested by the
          Employment Business; and (c) inform the Employment Business in writing
          or electronically if before the date of the commencement of the
          relevant Assignment the Temporary Worker has: (i) completed two or
          more assignments with the Client; (ii) completed at least one
          assignment with the Client and one or more assignments with a member
          of the Client's Group; or (iii) worked in more than two roles during
          an assignment with the Client and on at least two occasions has worked
          in a role that was not the same role as the previous role. Temporary
          Worker accepts any Assignment offered by the Employment Business, as
          soon as
          <br />
          <br />
          4.3 If the Temporary Worker is unable for any reason to attend work
          during the course of an Assignment, they should first inform the
          Employment Business at least twenty four hours before their normal
          start time (to enable alternative arrangements to be made). If this is
          not possible, the Temporary Worker should inform the Employment
          Business as soon as possible. 4.4 If, either before or during the
          course of an Assignment, the Temporary Worker becomes aware of any
          reason why they may not be suitable for an Assignment, they shall
          notify the Employment Business without delay.
          <br />
          <br />
          5. REMUNERATION
          <br />
          5.1 Subject to the Temporary Worker submitting properly authorised
          time sheets in accordance with clause 6, the Employment Business shall
          pay the Rate of Pay to the Temporary Worker. The Rate of Pay will be
          set out in the relevant Assignment Confirmation for a particular
          Assignment.
          <br />
          5.2 Where the Relevant Terms and Conditions contain a
          performance-related bonus for which the Temporary Worker may be
          eligible, the Temporary Worker will comply with any requirements of
          the Employment Business or the Client relating to the assessment of
          the Temporary Worker's performance for the purpose of determining
          entitlement to such bonus and the amount of any such bonus. If the
          Temporary Worker satisfies the relevant assessment criteria, the
          Employment Business will pay the Temporary Worker the bonus less any
          deductions that the employment business is required to make by law at
          the relevant time.
          <br />
          5.3 Subject to any applicable statutory entitlement and to clause 7
          and clause 8, the Temporary Worker is not entitled to receive payment
          from the Employment Business or the Client for time not spent working
          on the Assignment, whether in respect of holidays, illness or absence
          for any other reason, unless otherwise agreed. 6. TIME SHEETS
          <br />
          <br />
          6.1 At the end of each week of an Assignment (or at the end of an
          Assignment if it is for a period of one week or less or is completed
          before the end of a week) the Temporary Worker shall deliver
          electronically or hardcopies in person to the Employment Business a
          completed time sheet indicating the number of hours worked during the
          preceding week (or such lesser period) and signed by an authorised
          representative of the Client. 6.2 Subject to clause 6.3, the
          Employment Business shall endeavour to pay the Temporary Worker for
          all hours worked on a weekly basis, but will pay no later than on a
          fortnightly basis regardless of whether the Employment Business has
          received payment from the Client for those hours.
          <br />
          6.3 Where the Temporary Worker fails to submit a properly authorised
          time sheet, any payment due to the Temporary Worker may be delayed
          while the Employment Business investigates (in a timely fashion) what
          hours, if any, were worked by the Temporary Worker. The Employment
          Business shall make no payment to the Temporary Worker for hours not
          worked.
          <br />
          6.4 The Temporary Worker acknowledges and accepts that it could be a
          criminal offence under the Fraud Act 2006 to falsify any time sheet,
          for example by claiming payment for hours that were not actually
          worked. 7. ANNUAL LEAVE
          <br />
          7.1 All entitlement to annual leave must be taken during the course of
          the holiday year in which it accrues and no untaken holiday can be
          carried forward to the next holiday year
          <br />
          7.2 The Temporary Worker should give at least two weeks' notice of any
          proposed holiday dates and these must be agreed by the Recruitment
          Manager in writing in advance. No more than 11 days' holiday may be
          taken at any one time unless prior consent is obtained from the
          Recruitment Manager. The Employment Business may require the Temporary
          Worker to take holiday on specific days, as notified to the Temporary
          Worker.
          <br />
          7.3 At the end of the Assignment the Temporary Worker shall be
          entitled to be paid in lieu of accrued but untaken holiday for the
          holiday year in which termination takes place.
          <br />
          7.4 If the Temporary Worker has taken more holiday than their accrued
          entitlement at the end of the Assignment, the Employment Business
          shall be entitled to deduct the appropriate amount from any payments
          due to the Temporary Worker.
          <br />
          <br />
          8. SICKNESS ABSENCE
          <br />
          <br />
          8.1 If the Temporary Worker is absent from work for any reason, they
          must notify the Recruitment Manager of the reason for their absence as
          soon as possible but no later than 2 hours before the assignment is
          due to begin.
          <br />
          8.2 If the Temporary Worker satisfies the qualifying conditions laid
          down by law, they may be entitled to receive Statutory Sick Pay (SSP)
          at the prevailing rate in respect of any period of sickness or injury
          during the Assignment. The Temporary Worker will not be entitled to
          any other payments during such period. 8.3 In all cases of absence, a
          self-certification form, which is available from the Recruitment
          Manager, must be completed on the Temporary Worker's return to work
          and supplied to the Recruitment Manager. For any period of incapacity
          due to sickness or injury which lasts for seven consecutive days or
          more, a doctor's certificate (a "statement of fitness for work")
          stating the reason for absence must be obtained at the Temporary
          Worker's own cost and supplied to the Recruitment Manager. Further
          certificates must be obtained if the absence continues for longer than
          the period of the original certificate. If the Temporary Worker is
          certified as "fit for work" the Employment Business, the Temporary
          Worker and the Client will discuss any additional measures that may be
          needed to facilitate the Temporary Worker's return to work. If
          appropriate measures cannot be taken, the Temporary Worker will remain
          on sick leave and the Employment Business will set a date to review
          the situation.
          <br />
          8.4 The Temporary Worker's qualifying days for SSP purposes are Sunday
          to Saturday.
          <br />
          9. TERMINATION
          <br />
          <br />
          9.1 The Employment Business or the Client may terminate the Assignment
          at any time without prior notice or liability.
          <br />
          9.2 The Temporary Worker will provide a minimum of 24 hours’ notice
          should they wish to terminate the Assignment without prior notice or
          liability.
          <br />
          9.3 The Temporary Worker acknowledges that the continuation of an
          Assignment is subject to and dependent on the continuation of the
          agreement entered into between the Employment Business and the Client.
          If that agreement is terminated for any reason, the Assignment shall
          cease with immediate effect without liability to the Temporary Worker,
          except for payment for work done up to the date of termination of the
          Assignment. 9.4 Unless exceptional circumstances apply, the Temporary
          Worker's failure to inform the Client or the Employment Business of
          their inability to attend work as required by clause 4.3 will be
          treated as termination of the Assignment by the Temporary Worker.
          <br />
          9.5 If the Temporary Worker is absent during the course of an
          Assignment and the Assignment has not otherwise been terminated, the
          Employment Business will be entitled to terminate the Assignment in
          accordance with clause 9.1 if the work to which the Temporary Worker
          was assigned is no longer available.
          <br />
          10. INTELLECTUAL PROPERTY RIGHTS
          <br />
          <br />
          The Temporary Worker acknowledges that all Intellectual Property
          Rights deriving from services carried out by the Temporary Worker for
          the Client during the Assignment shall belong to the Client.
          Accordingly, the Temporary Worker shall execute all such documents and
          do all such acts as the Employment Business shall from time to time
          require in order to give effect to the Client's rights pursuant to
          this clause.
          <br />
          <br />
          11. CONFIDENTIALITY
          <br />
          <br />
          11.1 In order to protect the confidentiality and trade secrets of the
          Employment Business and the Client, the Temporary Worker agrees not at
          any time:
          <br />
          (a) whether during or after an Assignment (unless expressly so
          authorised by the Client or the Employment Business as a necessary
          part of the performance of their duties), to disclose to any person or
          to make use of any of the trade secrets or the Confidential
          Information of the Client or the Employment Business; or (b) to make
          any copy, abstract or summary of the whole or any part of any document
          or other material belonging to the Client or the Employment Business
          except when required to do so in the course of the Temporary Worker's
          duties under an Assignment, in which circumstances such copy abstract
          or summary would belong to the Client or the Employment Business, as
          appropriate.
          <br />
          11.2 The restriction in clause 11.1 does not apply to:
          <br />
          (a) any use or disclosure authorised by the Client or the Employment
          Business or as required by law a court of competent jurisdiction or
          any governmental or regulatory authority;
          <br />
          (b) any information which is already in, or comes into, the public
          domain otherwise than through the Temporary Worker's unauthorised
          disclosure; or
          <br />
          (c) the making of a protected disclosure within the meaning of section
          43A of the Employment Rights Act 1996. 11.3 At the end of each
          Assignment or on request the Temporary Worker agrees to deliver up to
          the Client or the Employment Business (as directed) all documents
          (including copies), ID cards, swipe cards, equipment, passwords, pass
          codes and other materials belonging to the Client which are in its
          possession, including any data produced, maintained or stored on the
          Client's computer systems or other electronic equipment.
          <br />
          12. DATA PROTECTION
          <br />
          <br />
          12.1 The Temporary Worker consents to the Employment Business and the
          Client [and any other intermediary involved in supplying the services
          of the Temporary Worker to the Client] holding and processing data
          relating to them for legal, personnel, administrative and management
          purposes and in particular to the processing of any "sensitive
          personal data" as defined in the Data Protection Act 1998 relating to
          them including, as appropriate:
          <br />
          (a) information about their physical or mental health or condition to
          monitor sick leave and take decisions as to their fitness for work;
          <br />
          (b) their racial or ethnic origin or religious or similar beliefs to
          monitor compliance with equal opportunities legislation;
          <br />
          (c) information relating to any criminal proceedings in which they
          have been involved for insurance purposes and to comply with legal
          requirements and obligations to third parties; 12.2 The Temporary
          Worker consents to the Employment Business and the Client or any
          intermediary involved in supplying the Temporary Worker's services to
          the Client making such information available to the Client, other
          Group companies, those who provide products or services to the
          Employment Business (such as advisers), regulatory authorities,
          governmental or quasi-governmental organisations and potential
          purchasers of the Employment Business or other Group companies or any
          part of its business.
          <br />
          12.3 The Temporary Worker consents to the transfer of such information
          outside the European Economic Area for purposes connected with the
          performance of this agreement.
          <br />
          <br />
          13. WARRANTIES AND INDEMNITIES
          <br />
          <br />
          13.1 The Temporary Worker warrants that:
          <br />
          (a) the information supplied to the Employment Business in any
          application documents is correct; (b) the Temporary Worker has the
          experience, training, qualifications and any authorisation which the
          Client considers are necessary or which are required by law or by any
          professional body for the Temporary Worker to possess in order to
          perform the Assignment;
          <br />
          (c) the Temporary Worker is not prevented by any other agreement,
          arrangement, restriction (including, without limitation, a restriction
          in favour of any employment agency, employment business or client) or
          any other reason, from fulfilling the Temporary Worker's obligations
          under this agreement; and (d) the Temporary Worker has valid and
          subsisting leave to enter and remain in the United Kingdom for the
          duration of this agreement and is not (in relation to such leave)
          subject to any conditions which may preclude or have an adverse effect
          on the Assignment.
          <br />
          13.2 The Temporary Worker shall indemnify and keep indemnified the
          Employment Business and the Client against all Demands (including
          legal and other professional fees and expenses) which the Employment
          Business or the Client may suffer, sustain, incur, pay or be put to
          arising from or in connection with: (a) any failure by the Temporary
          Worker to comply with its obligations under this agreement;
          <br />
          (b) any negligent or fraudulent act or omission by the Temporary
          Worker;
          <br />
          (c) the disclosure by the Temporary Worker of any Confidential
          Information;
          <br />
          (d) any employment-related claim brought by the Temporary Worker in
          connection with the Assignment; or (e) the infringement by the
          Temporary Worker of the Client's or any Group Company's Intellectual
          Property Rights.
          <br />
          <br />
          14. NO PARTNERSHIP OR AGENCY
          <br />
          <br />
          14.1 Nothing in this agreement is intended to, or shall be deemed to,
          establish any partnership or joint venture between any of the parties,
          constitute any party the agent of another party, or authorise any
          party to make or enter into any commitments for or on behalf of any
          other party.
          <br />
          14.2 Each party confirms it is acting on its own behalf and not for
          the benefit of any other person.
          <br />
          <br />
          15. ENTIRE AGREEMENT
          <br />
          <br />
          15.1 This agreement constitutes the entire agreement between the
          parties and supersedes and extinguishes all previous agreements,
          promises, assurances, warranties, representations and understandings
          between them, whether written or oral, relating to its subject matter.
          <br />
          15.2 Each party acknowledges that in entering into this agreement it
          does not rely on, and shall have no remedies in respect of, any
          statement, representation, assurance or warranty (whether made
          innocently or negligently) that is not set out in this agreement.
          <br />
          15.3 No variation of this agreement shall be effective unless it is in
          writing and signed by each of the parties (or their authorised
          representatives). A written copy of the varied terms, including the
          date from which they take effect, shall be given to the Temporary
          Worker no later than the fifth Business Day following the day on which
          the variation was agreed.
          <br />
          15.4 Nothing in this clause shall limit or exclude any liability for
          fraud.
          <br />
          15.5 Each party agrees that it shall have no claim for innocent or
          negligent misrepresentation based on any statement in this agreement.
          <br />
          16. THIRD PARTY RIGHTS
          <br />
          No one other than a party to this agreement, their successors and
          permitted assignees, shall have any right to enforce any of its terms.
          <br />
          <br />
          17. NOTICES
          <br />
          <br />
          17.1 Any notice or other communication given to a party under or in
          connection with this agreement shall be in writing and shall be:
          <br />
          (a) delivered by hand or by pre-paid first-class post or other next
          working day delivery service at its registered office (if a company)
          or its principal place of business (in any other case); or
          <br />
          (b) sent by fax to its main fax number.
          <br />
          (c) sent by email to or from the Recruitment Manager.
          <br />
          17.2 Any notice or communication shall be deemed to have been
          received:
          <br />
          (a) if delivered by hand, on signature of a delivery receipt or at the
          time the notice is left at the proper address;
          <br />
          (b) if sent by pre-paid first-class post or other next working day
          delivery service, at 11:00 am on the second Business Day after posting
          or at the time recorded by the delivery service.
          <br />
          (c) if sent by fax, at 11.00 am on the next Business Day after
          transmission.
          <br />
          (d) if sent by email, at 11:00am on the next Business Day after
          transmission
          <br />
          17.3 This clause does not apply to the service of any proceedings or
          other documents in any legal action or, where applicable, any
          arbitration or other method of dispute resolution.
          <br />
          <br />
          18. SEVERANCE
          <br />
          <br />
          18.1 If any provision or part-provision of this agreement is or
          becomes invalid, illegal or unenforceable, it shall be deemed modified
          to the minimum extent necessary to make it valid, legal and
          enforceable. If such modification is not possible, the relevant
          provision or part-provision shall be deemed deleted. Any modification
          to or deletion of a provision or part-provision under this clause
          shall not affect the validity and enforceability of the rest of this
          agreement.
          <br />
          18.2 If one party gives notice to the other of the possibility that
          any provision or part-provision of this agreement is invalid, illegal
          or unenforceable, the parties shall negotiate in good faith to amend
          such provision so that, as amended, it is legal, valid and
          enforceable, and, to the greatest extent possible, achieves the
          intended commercial result of the original provision.
          <br />
          <br />
          19. GOVERNING LAW This agreement and any dispute or claim arising out
          of or in connection with it or its subject matter or formation
          (including non-contractual disputes or claims) shall be governed by
          and construed in accordance with the law of England and Wales.
          <br />
          <br />
          20. JURISDICTION Each party irrevocably agrees that the courts of
          England and Wales shall have exclusive jurisdiction to settle any
          dispute or claim arising out of or in connection with this agreement
          or its subject matter or formation (including non-contractual disputes
          or claims).
          <br />
          <br />
          21. DISCLAIMER Before entering into this agreement you should visit
          the website{" "}
          <a
            href="www.gov.uk/agency-workers-your-rights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black transition-all duration-500 hover:text-blue-400"
          >
            www.gov.uk/agency-workers-your-rights
          </a>{" "}
          which provides some basic information regarding your rights under the
          Agency Workers Regulations 2010. [If you need further information
          regarding your rights under the Agency Workers Regulations 2010 then
          you should obtain legal advice before entering into this agreement.]
          By entering into this agreement you warrant, represent and confirm
          that you understand your rights under the Agency Workers Regulations
          2010. This agreement has been entered into on the date stated at the
          beginning of it.
          <br />
          <br />
          Above terms are accepted between COPORA Ltd and
        </div>
        {/* End */}
        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4 pb-6">
          <PrimaryInput
            label="First Name"
            isRequired
            placeholder="Enter first name"
            value={agreementDetails.firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              handleChange("firstName", e.target.value);
            }}
          />
          <PrimaryInput
            label="Last Name"
            isRequired
            placeholder="Enter last name"
            value={agreementDetails.lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              handleChange("lastName", e.target.value);
            }}
          />
        </div>
        <div className="w-full flex items-center gap-3 col-span-2  pb-6">
          <PrimaryInput
            label="Address"
            isRequired
            placeholder="Enter address"
            value={agreementDetails.address}
            onChange={(e) => {
              setAddress(e.target.value);
              handleChange("address", e.target.value);
            }}
            // onChange={(e) => setAddress("address", e.target.value)}
          />
        </div>
        <div className="w-full flex items-center gap-3 col-span-2">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            className="accent-appGreen"
            checked={agreementDetails.userConsent}
            onChange={(e) => handleChange("userConsent", e.target.checked)}
          />
          <label htmlFor="agreement">
            Allow Copora to use your name as signature
          </label>
        </div>
      </div>
    </>
  );
};

export default AgreementConsentForm;
