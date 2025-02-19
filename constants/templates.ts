export const templates = [
  {
    id: "blank-document",
    label: "Blank Document",
    imageUrl: "/templates/blank-document.svg",
    initialContent: "",
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/templates/business-letter.svg",
    initialContent: `<div>
    <p>Your Company Name</p>
    <p>123 Business Street</p>
    <p>City, State, ZIP Code</p>
    <p>Email: your.email@company.com | Phone: (123) 456-7890</p>
    <br>
    <p>Date: October 10, 2023</p>
    <br>
    <p>Recipient's Name</p>
    <p>Recipient's Company Name</p>
    <p>456 Business Avenue</p>
    <p>City, State, ZIP Code</p>
    <br>
    <p>Dear [Recipient's Name],</p>
    <br>
    <p>I am writing to formally [state the purpose of your letter]. We appreciate the opportunity to [mention any relevant context or relationship].</p>
    <br>
    <p>Please feel free to contact me at your earliest convenience to discuss this matter further. You can reach me at (123) 456-7890 or via email at your.email@company.com.</p>
    <br>
    <p>Thank you for your time and consideration. I look forward to your response.</p>
    <br>
    <p>Sincerely,</p>
    <p>[Your Full Name]</p>
    <p>[Your Job Title]</p>
  </div>`,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/templates/cover-letter.svg",
    initialContent: `<div>
  <p>[Your Full Name]</p>
  <p>[Your Address]</p>
  <p>[City, State, ZIP Code]</p>
  <p>Email: [your.email@example.com] | Phone: [(123) 456-7890]</p>
  <br>
  <p>Date: [October 10, 2023]</p>
  <br>
  <p>[Hiring Manager's Name]</p>
  <p>[Company Name]</p>
  <p>[Company Address]</p>
  <p>[City, State, ZIP Code]</p>
  <br>
  <p>Dear [Hiring Manager's Name],</p>
  <br>
  <p>I am excited to apply for the [Job Title] position at [Company Name], as advertised on [where you found the job posting]. With my background in [your field or industry] and my passion for [specific aspect of the job or industry], I am confident in my ability to contribute effectively to your team.</p>
  <br>
  <p>In my previous role at [Your Previous Company], I [describe a key achievement or responsibility that aligns with the job you're applying for]. This experience has equipped me with [specific skills or knowledge relevant to the job], which I believe will be valuable in achieving [specific goal or project at the new company].</p>
  <br>
  <p>What excites me most about [Company Name] is [specific reason related to the company's mission, values, or projects]. I am particularly drawn to [specific aspect of the company or role], and I am eager to bring my [specific skills or qualities] to support your team's success.</p>
  <br>
  <p>I would welcome the opportunity to discuss how my skills and experiences align with the needs of [Company Name]. Please find my resume attached for your review. I am available at your convenience for an interview and can be reached at [(123) 456-7890] or via email at [your.email@example.com].</p>
  <br>
  <p>Thank you for considering my application. I look forward to the possibility of contributing to [Company Name] and am excited about the opportunity to work with such a dynamic team.</p>
  <br>
  <p>Sincerely,</p>
  <p>[Your Full Name]</p>
</div>`,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/templates/letter.svg",
    initialContent: `<p>Dear [Recipient Name],</p>

<p>I hope this letter finds you well.</p>

<p>I am writing to you regarding [Subject of the letter].</p>

<p>[Body of the letter - you can add your content here]</p>

<p>Thank you for your time and consideration.</p>

<p>Sincerely,</p>

<p>[Your Name]</p>`,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/templates/project-proposal.svg",
    initialContent: `<h1>Project Proposal: [Project Title]</h1>

<p><strong>Prepared By:</strong> [Your Name/Team Name]</p>
<p><strong>Date:</strong> [Date]</p>

<h2>1. Introduction</h2>
<p>This proposal outlines a project to [briefly describe the project's purpose and goals]. It addresses the need for [problem or opportunity] and aims to achieve [desired outcomes].</p>

<h2>2. Project Overview</h2>
<p><strong>Project Title:</strong> [Project Title]</p>
<p><strong>Project Summary:</strong> [A concise summary of the project]</p>
<p><strong>Goals and Objectives:</strong>
    <ul>
        <li>[Specific Goal 1]</li>
        <li>[Specific Goal 2]</li>
        <li>[Specific Goal 3]</li>
    </ul>
</p>
<p><strong>Target Audience:</strong> [Who will benefit from this project?]</p>

<h2>3. Project Description</h2>
<p>[Detailed explanation of how the project will be executed. Include specifics about methodology, technology, and key activities.]</p>

<h2>4. Project Timeline</h2>
<p>[Outline the project timeline with key milestones and deadlines. You can use a table or bullet points.]</p>
<ul>
    <li><strong>Phase 1:</strong> [Description] - [Start Date] to [End Date]</li>
    <li><strong>Phase 2:</strong> [Description] - [Start Date] to [End Date]</li>
    <li><strong>Phase 3:</strong> [Description] - [Start Date] to [End Date]</li>
</ul>

<h2>5. Resources and Budget</h2>
<p>[Detail the resources required, including personnel, equipment, and materials. Provide a budget breakdown.]</p>
<p><strong>Budget Summary:</strong></p>
<ul>
    <li>[Item 1]: [Cost]</li>
    <li>[Item 2]: [Cost]</li>
    <li>[Total Cost]: [Total]</li>
</ul>

<h2>6. Evaluation and Measurement</h2>
<p>[Explain how the project's success will be evaluated and measured. Include key performance indicators (KPIs).]</p>

<h2>7. Conclusion</h2>
<p>[Summarize the key benefits of the project and reiterate its importance. Express your enthusiasm and readiness to proceed.]</p>

<h2>8. Appendix (Optional)</h2>
<p>[Include any supporting documents, such as resumes, letters of support, or detailed budget spreadsheets.]</p>`,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/templates/resume.svg",
    initialContent: `<h1>[Your Name]</h1>
<p>[Your Phone Number] | [Your Email Address] | [Your LinkedIn Profile URL (Optional)] | [Your Portfolio/Website URL (Optional)]</p>

<h2>Summary</h2>
<p>[A brief, compelling overview of your skills and experience. Tailor this to the specific job you're applying for. Highlight your key accomplishments and career goals.]</p>

<h2>Experience</h2>

<h3>[Job Title], [Company Name], [City, State] - [Start Date] to [End Date]</h3>
<ul>
    <li>[Describe your responsibilities and accomplishments using strong action verbs. Quantify your achievements whenever possible.]</li>
    <li>[Example: Led a team of 5 developers, resulting in a 15% increase in project delivery speed.]</li>
    <li>[Example: Developed and implemented a new marketing strategy that increased website traffic by 20%.]</li>
    <li>[Example: Managed a budget of $X, successfully reducing costs by Y%.]</li>
</ul>

<h3>[Previous Job Title], [Previous Company Name], [City, State] - [Start Date] to [End Date]</h3>
<ul>
    <li>[Describe your responsibilities and accomplishments.]</li>
    <li>[Example: Provided excellent customer service, consistently exceeding customer satisfaction targets.]</li>
</ul>

<h2>Education</h2>

<h3>[Degree Name], [Major], [University Name], [City, State] - [Graduation Year]</h3>
<p>[Optional: Include relevant coursework, GPA (if above 3.5), or honors.]</p>

<h3>[Previous Degree Name], [Major], [Previous University Name], [City, State] - [Graduation Year]</h3>
<p>[Optional: Include relevant coursework, GPA (if above 3.5), or honors.]</p>

<h2>Skills</h2>
<p>[List your technical and soft skills, separated by categories if applicable. Tailor this section to the specific job requirements. Examples:]</p>
<ul>
    <li><strong>Technical Skills:</strong> [Programming languages, software, tools, etc.]</li>
    <li><strong>Soft Skills:</strong> [Communication, teamwork, problem-solving, leadership, etc.]</li>
</ul>

<h2>Projects (Optional)</h2>
<p>[If you have personal or academic projects relevant to the job, describe them here. Include links to repositories or demos if possible.]</p>
<ul>
    <li>[Project Name]: [Brief description and your role.]</li>
</ul>

<h2>Awards and Recognition (Optional)</h2>
<p>[List any relevant awards or recognition you've received.]</p>

<h2>Volunteer Experience (Optional)</h2>
<p>[List any volunteer experience.]</p>`,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/templates/software-proposal.svg",
    initialContent: `<h1>Software Proposal: [Project Name]</h1>

<p><strong>Prepared By:</strong> [Your Company/Your Name]</p>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Client:</strong> [Client Name]</p>

<h2>1. Introduction</h2>

<p>This proposal outlines the development of [Project Name], a software solution designed to [briefly describe the software's purpose and benefits]. This solution will address [client's specific needs/problems] and provide [desired outcomes].</p>

<h2>2. Project Overview</h2>

<h3>2.1. Project Goals</h3>
<ul>
    <li>[Goal 1: e.g., Streamline workflow]</li>
    <li>[Goal 2: e.g., Increase efficiency]</li>
    <li>[Goal 3: e.g., Improve data management]</li>
</ul>

<h3>2.2. Project Scope</h3>
<p>This project will encompass the following key features:</p>
<ul>
    <li>[Feature 1: e.g., User authentication and authorization]</li>
    <li>[Feature 2: e.g., Data entry and management]</li>
    <li>[Feature 3: e.g., Reporting and analytics]</li>
    <li>[Feature 4: e.g., API integration with [external service]]</li>
</ul>
<p>This project will *not* include:</p>
<ul>
    <li>[Out-of-scope feature 1]</li>
    <li>[Out-of-scope feature 2]</li>
</ul>

<h3>2.3. Target Audience</h3>
<p>[Describe the intended users of the software.]</p>

<h2>3. Technical Approach</h2>

<h3>3.1. Technology Stack</h3>
<p>We propose to use the following technologies:</p>
<ul>
    <li><strong>Frontend:</strong> [e.g., React, Angular, Vue.js]</li>
    <li><strong>Backend:</strong> [e.g., Node.js, Python/Django, Ruby on Rails]</li>
    <li><strong>Database:</strong> [e.g., PostgreSQL, MySQL, MongoDB]</li>
    <li><strong>Cloud Platform (if applicable):</strong> [e.g., AWS, Azure, Google Cloud]</li>
</ul>

<h3>3.2. Development Methodology</h3>
<p>We will employ [e.g., Agile/Scrum] methodology to ensure iterative development, flexibility, and continuous communication with the client.</p>

<h3>3.3. Architecture</h3>
<p>[Provide a high-level overview of the software architecture, including diagrams if necessary.]</p>

<h2>4. Project Timeline</h2>

<p>The estimated project timeline is as follows:</p>
<ul>
    <li><strong>Phase 1: Requirements Gathering and Planning:</strong> [Start Date] - [End Date]</li>
    <li><strong>Phase 2: Development:</strong> [Start Date] - [End Date]</li>
    <li><strong>Phase 3: Testing and Quality Assurance:</strong> [Start Date] - [End Date]</li>
    <li><strong>Phase 4: Deployment and Training:</strong> [Start Date] - [End Date]</li>
</ul>

<h2>5. Cost and Payment</h2>

<p>The total estimated cost for this project is $[Total Cost].</p>
<p>Payment terms:</p>
<ul>
    <li>[e.g., 30% upon project commencement]</li>
    <li>[e.g., 40% upon completion of development phase]</li>
    <li>[e.g., 30% upon final delivery and acceptance]</li>
</ul>

<h2>6. Maintenance and Support</h2>

<p>[Describe the post-launch maintenance and support options, including response times and service level agreements (SLAs).]</p>

<h2>7. Conclusion</h2>

<p>We are confident that our team's expertise and experience will deliver a high-quality software solution that meets your specific needs. We look forward to the opportunity to partner with you on this project.</p>

<h2>8. Appendix (Optional)</h2>

<p>[Include any supporting documents, such as detailed technical specifications, team bios, or case studies.]</p>`,
  },
];
