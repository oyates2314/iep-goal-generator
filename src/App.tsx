import { useState } from 'react';

const IEPGoalGeneratorWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    studentInfo: {
      name: '',
      grade: '',
      disability: '',
      currentLevel: ''
    },
    goalArea: '',
    assessmentData: '',
    presentLevel: '',
    targetSkill: '',
    conditions: '',
    criteria: ''
  });

  const [generatedGoals, setGeneratedGoals] = useState<string[]>([]);

  const steps = [
    { id: 1, title: "Student Profile" },
    { id: 2, title: "Goal Area" },
    { id: 3, title: "Assessment Data" },
    { id: 4, title: "Present Level" },
    { id: 5, title: "Target Skill" },
    { id: 6, title: "Generate Goals" }
  ];

  const goalAreas = [
    { id: 'reading', label: 'Reading', description: 'Decoding, comprehension, fluency' },
    { id: 'math', label: 'Math', description: 'Computation, problem-solving, concepts' },
    { id: 'writing', label: 'Written Expression', description: 'Grammar, composition, mechanics' },
    { id: 'behavior', label: 'Behavior', description: 'Social skills, self-regulation, compliance' },
    { id: 'communication', label: 'Communication', description: 'Speech, language, social communication' },
    { id: 'adaptive', label: 'Adaptive/Life Skills', description: 'Self-care, vocational, independent living' },
    { id: 'motor', label: 'Motor Skills', description: 'Fine motor, gross motor, sensory' },
    { id: 'transition', label: 'Transition', description: 'Post-secondary planning, job skills' }
  ];

  const sampleGoals: { [key: string]: string[] } = {
    reading: [
      "Given a 3rd grade level text and graphic organizer, [Student] will identify the main idea and 3 supporting details with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by [Date].",
      "When presented with 20 sight words at the 2nd grade level, [Student] will read the words correctly within 3 seconds per word with 90% accuracy across 3 consecutive sessions as measured by curriculum-based assessments by [Date].",
      "Given a reading passage at instructional level with pre-reading strategies, [Student] will answer 4 out of 5 comprehension questions (literal and inferential) with 80% accuracy across 4 consecutive trials as measured by teacher observation and data collection by [Date]."
    ],
    math: [
      "Given manipulatives and visual supports, [Student] will solve 2-digit addition problems with regrouping with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by [Date].",
      "When presented with word problems involving time and money, [Student] will identify the relevant information and solve the problem with 75% accuracy across 3 consecutive sessions as measured by curriculum-based assessments by [Date].",
      "Given a hundreds chart and verbal prompts, [Student] will skip count by 2s, 5s, and 10s to 100 with 90% accuracy across 4 consecutive trials as measured by teacher observation by [Date]."
    ],
    behavior: [
      "When experiencing frustration in academic or social situations, [Student] will use appropriate coping strategies (deep breathing, requesting a break, asking for help) instead of disruptive behaviors in 8 out of 10 opportunities across 5 consecutive school days as measured by teacher data collection by [Date].",
      "During structured activities, [Student] will remain in assigned area and follow adult directions within 30 seconds of initial request with 85% accuracy across 4 out of 5 consecutive sessions as measured by teacher observation by [Date].",
      "In social interactions with peers, [Student] will initiate appropriate conversation starters and maintain topic for 3 exchanges with 70% accuracy across 3 consecutive weeks as measured by teacher data collection by [Date]."
    ],
    writing: [
      "Given a writing prompt and graphic organizer, [Student] will write a 5-sentence paragraph with topic sentence, 3 supporting details, and conclusion sentence with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by [Date].",
      "When completing written assignments, [Student] will use proper capitalization and punctuation in sentences with 75% accuracy across 3 consecutive sessions as measured by curriculum-based assessments by [Date]."
    ],
    communication: [
      "During structured conversation activities, [Student] will maintain eye contact and respond appropriately to social questions in 8 out of 10 opportunities as measured by teacher data collection by [Date].",
      "Given visual supports, [Student] will use complete sentences to express wants and needs in 85% of opportunities across 4 consecutive sessions as measured by speech-language pathologist observation by [Date]."
    ],
    adaptive: [
      "During daily living skills instruction, [Student] will independently complete a 3-step personal hygiene routine with 90% accuracy across 5 consecutive trials as measured by teacher observation by [Date].",
      "Given visual schedule and minimal prompting, [Student] will transition between activities within 2 minutes in 8 out of 10 opportunities as measured by teacher data collection by [Date]."
    ],
    motor: [
      "During fine motor activities, [Student] will use appropriate pencil grip and write letters within designated lines with 80% accuracy across 4 out of 5 consecutive trials as measured by occupational therapist observation by [Date].",
      "Given gross motor activities, [Student] will demonstrate bilateral coordination skills by completing 5 jumping jacks with proper form in 85% of opportunities as measured by physical therapist data collection by [Date]."
    ],
    transition: [
      "During career exploration activities, [Student] will identify 3 personal strengths and how they relate to potential job opportunities with 80% accuracy across 4 consecutive sessions as measured by transition coordinator assessment by [Date].",
      "Given community-based instruction, [Student] will demonstrate appropriate social skills in public settings by greeting others and using polite language in 9 out of 10 opportunities as measured by teacher observation by [Date]."
    ]
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateGoals = () => {
    const goals = sampleGoals[formData.goalArea] || [];
    setGeneratedGoals(goals);
    setCurrentStep(6);
  };

  // Inline styles
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '24px'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px'
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#6b7280'
  };

  const progressContainerStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const stepsContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const stepStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
  };

  const stepNumberStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: isActive ? '#3b82f6' : '#e5e7eb',
    color: isActive ? 'white' : '#6b7280',
    fontWeight: '600'
  });

  const stepTitleStyle = (isActive: boolean): React.CSSProperties => ({
    marginLeft: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: isActive ? '#2563eb' : '#6b7280'
  });

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    height: '8px'
  };

  const progressFillStyle: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    height: '8px',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    width: `${(currentStep / steps.length) * 100}%`
  };

  const contentStyle: React.CSSProperties = {
    minHeight: '400px',
    marginBottom: '32px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: '#6b7280',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const goalAreaStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: '16px',
    border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#eff6ff' : 'white',
    transition: 'all 0.2s ease'
  });

  const goalCardStyle: React.CSSProperties = {
    backgroundColor: '#f9fafb',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '16px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>IEP Goal Generator</h1>
          <p style={subtitleStyle}>AI-powered tool to create legally compliant, measurable IEP goals</p>
        </div>

        {/* Progress Steps */}
        <div style={progressContainerStyle}>
          <div style={stepsContainerStyle}>
            {steps.map((step, index) => (
              <div key={step.id} style={stepStyle}>
                <div style={stepNumberStyle(currentStep >= step.id)}>
                  {step.id}
                </div>
                <div style={stepTitleStyle(currentStep >= step.id)}>
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <span style={{ color: '#9ca3af', margin: '0 8px' }}>→</span>
                )}
              </div>
            ))}
          </div>
          <div style={progressBarStyle}>
            <div style={progressFillStyle} />
          </div>
        </div>

        {/* Step Content */}
        <div style={contentStyle}>
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Student Profile</h3>
              <div style={gridStyle}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                    Student Name
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={formData.studentInfo.name}
                    onChange={(e) => handleInputChange('studentInfo', 'name', e.target.value)}
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                    Grade Level
                  </label>
                  <select
                    style={inputStyle}
                    value={formData.studentInfo.grade}
                    onChange={(e) => handleInputChange('studentInfo', 'grade', e.target.value)}
                  >
                    <option value="">Select grade</option>
                    <option value="K">Kindergarten</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                    <option value="6">6th Grade</option>
                    <option value="7">7th Grade</option>
                    <option value="8">8th Grade</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                    Primary Disability
                  </label>
                  <select
                    style={inputStyle}
                    value={formData.studentInfo.disability}
                    onChange={(e) => handleInputChange('studentInfo', 'disability', e.target.value)}
                  >
                    <option value="">Select disability</option>
                    <option value="ASD">Autism Spectrum Disorder</option>
                    <option value="ID">Intellectual Disability</option>
                    <option value="SLD">Specific Learning Disability</option>
                    <option value="EBD">Emotional/Behavioral Disorder</option>
                    <option value="ADHD">ADHD</option>
                    <option value="OHI">Other Health Impairment</option>
                    <option value="SI">Speech Impairment</option>
                    <option value="HI">Hearing Impairment</option>
                    <option value="VI">Visual Impairment</option>
                    <option value="OI">Orthopedic Impairment</option>
                    <option value="TBI">Traumatic Brain Injury</option>
                    <option value="MD">Multiple Disabilities</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                    Current Performance Level
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={formData.studentInfo.currentLevel}
                    onChange={(e) => handleInputChange('studentInfo', 'currentLevel', e.target.value)}
                    placeholder="e.g., 2nd grade reading level"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Select Goal Area</h3>
              <div style={gridStyle}>
                {goalAreas.map(area => (
                  <div
                    key={area.id}
                    onClick={() => handleDirectChange('goalArea', area.id)}
                    style={goalAreaStyle(formData.goalArea === area.id)}
                  >
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{area.label}</h4>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{area.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Generated Goals</h3>
              {generatedGoals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px' }}>
                  <button onClick={generateGoals} style={buttonStyle}>
                    Generate Goals
                  </button>
                </div>
              ) : (
                <div>
                  {generatedGoals.map((goal, index) => (
                    <div key={index} style={goalCardStyle}>
                      <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                        Goal Option {index + 1}
                      </h4>
                      <p style={{ color: '#374151', lineHeight: '1.6' }}>{goal}</p>
                    </div>
                  ))}
                  <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
                    <h4 style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>Next Steps:</h4>
                    <ul style={{ fontSize: '14px', color: '#92400e', paddingLeft: '20px' }}>
                      <li>Review and customize goals for your student</li>
                      <li>Add to IEP document with proper dates</li>
                      <li>Set up data collection system</li>
                      <li>Share with team members</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={{
              ...secondaryButtonStyle,
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            disabled={currentStep === 6}
            style={{
              ...buttonStyle,
              opacity: currentStep === 6 ? 0.5 : 1,
              cursor: currentStep === 6 ? 'not-allowed' : 'pointer'
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default IEPGoalGeneratorWorkflow;
