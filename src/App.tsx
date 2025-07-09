import { useState } from 'react';

const IEPGoalGenerator = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    disability: '',
    goalArea: '',
    template: '',
    presentLevel: '',
    generatedGoal: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [complianceWarnings, setComplianceWarnings] = useState<string[]>([]);

  const goalAreas = [
    'Reading',
    'Math',
    'Written Expression',
    'Behavior/Self-Management',
    'Communication',
    'Social Skills',
    'Adaptive/Life Skills',
    'Motor Skills',
    'Transition'
  ];

  const templates = {
    'Behavior/Self-Management': [
      'On-task behavior',
      'Following directions',
      'Self-regulation strategies',
      'Appropriate social interactions',
      'Completing assignments independently'
    ],
    'Social Skills': [
      'Turn-taking in conversation',
      'Peer interaction',
      'Conflict resolution',
      'Social problem-solving',
      'Maintaining friendships'
    ],
    'Transition': [
      'Self-advocacy skills',
      'Job readiness',
      'Independent living skills',
      'Post-secondary planning',
      'Community navigation'
    ]
  };

  const sampleGoals = {
    'Reading': "Given a {grade} grade level text and graphic organizer, {student} will identify the main idea and 3 supporting details with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by {date}.",
    'Math': "Given manipulatives and visual supports, {student} will solve 2-digit addition problems with regrouping with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by {date}.",
    'Written Expression': "Given a writing prompt and graphic organizer, {student} will write a 5-sentence paragraph with topic sentence, 3 supporting details, and conclusion sentence with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by {date}.",
    'Behavior/Self-Management': "When experiencing frustration in academic or social situations, {student} will use appropriate coping strategies (deep breathing, requesting a break, asking for help) instead of disruptive behaviors in 8 out of 10 opportunities across 5 consecutive school days as measured by teacher data collection by {date}.",
    'Communication': "During structured conversation activities, {student} will maintain eye contact and respond appropriately to social questions in 8 out of 10 opportunities as measured by teacher data collection by {date}.",
    'Social Skills': "In social interactions with peers, {student} will initiate appropriate conversation starters and maintain topic for 3 exchanges with 70% accuracy across 3 consecutive weeks as measured by teacher data collection by {date}.",
    'Adaptive/Life Skills': "During daily living skills instruction, {student} will independently complete a 3-step personal hygiene routine with 90% accuracy across 5 consecutive trials as measured by teacher observation by {date}.",
    'Motor Skills': "During fine motor activities, {student} will use appropriate pencil grip and write letters within designated lines with 80% accuracy across 4 out of 5 consecutive trials as measured by occupational therapist observation by {date}.",
    'Transition': "During career exploration activities, {student} will identify 3 personal strengths and how they relate to potential job opportunities with 80% accuracy across 4 consecutive sessions as measured by transition coordinator assessment by {date}."
  };

  const checkCompliance = (goalText: string) => {
    const warnings: string[] = [];
    
    // Check for percentage/accuracy criteria
    const hasPercentage = /\d+%/.test(goalText);
    const hasAccuracy = /accuracy|correct/.test(goalText.toLowerCase());
    if (!hasPercentage && !hasAccuracy) {
      warnings.push("Goal may not be measurable—add a percentage or accuracy criteria");
    }

    // Check for time frame
    const hasTimeFrame = /\d+\s+(day|week|month|trial|session|consecutive)/.test(goalText.toLowerCase());
    if (!hasTimeFrame) {
      warnings.push("Goal may be missing time frame—add number of trials, sessions, or days");
    }

    // Check for measurement method
    const hasMeasurement = /(measured by|as evidenced by|data collection|observation|assessment)/.test(goalText.toLowerCase());
    if (!hasMeasurement) {
      warnings.push("Goal may be missing measurement method—add 'as measured by...'");
    }

    // Check for baseline
    const hasBaseline = /current|baseline|present/.test(goalText.toLowerCase());
    if (!hasBaseline && formData.presentLevel && !goalText.includes(formData.presentLevel.slice(0, 20))) {
      warnings.push("Consider referencing current performance level in goal");
    }

    setComplianceWarnings(warnings);
  };

  const generateGoal = () => {
    if (!formData.goalArea) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let baseGoal = sampleGoals[formData.goalArea as keyof typeof sampleGoals] || 
                     "Given appropriate supports, {student} will demonstrate improved skills in {area} with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by {date}.";
      
      // Customize based on form data
      const currentDate = new Date();
      const futureDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
      
      let customizedGoal = baseGoal
        .replace('{student}', formData.studentName || '[Student Name]')
        .replace('{grade}', formData.grade || '[Grade Level]')
        .replace('{area}', formData.goalArea.toLowerCase())
        .replace('{date}', futureDate.toLocaleDateString());

      // If there's a present level, try to incorporate it
      if (formData.presentLevel) {
        // Simple customization based on present level content
        if (formData.presentLevel.toLowerCase().includes('struggle')) {
          customizedGoal = customizedGoal.replace('80%', '70%');
        }
        if (formData.presentLevel.toLowerCase().includes('independent')) {
          customizedGoal = customizedGoal.replace('80%', '90%');
        }
      }

      setFormData(prev => ({ ...prev, generatedGoal: customizedGoal }));
      checkCompliance(customizedGoal);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.generatedGoal);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate when key fields are filled
    if ((field === 'goalArea' || field === 'presentLevel') && value && formData.goalArea) {
      setTimeout(generateGoal, 500);
    }
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#64748b',
    fontSize: '16px'
  };

  const mainContentStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  };

  const panelStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px'
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '200px',
    resize: 'vertical' as const,
    fontFamily: 'inherit'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginRight: '12px'
  };

  const copyButtonStyle: React.CSSProperties = {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
  };

  const warningStyle: React.CSSProperties = {
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '16px'
  };

  const toastStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    fontWeight: '600'
  };

  const privacyBannerStyle: React.CSSProperties = {
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#475569'
  };

  return (
    <div style={containerStyle}>
      {showCopiedToast && (
        <div style={toastStyle}>
          ✓ Copied to clipboard!
        </div>
      )}

      <div style={headerStyle}>
        <h1 style={titleStyle}>IEP Goal Generator</h1>
        <p style={subtitleStyle}>Generate legally compliant, measurable IEP goals in seconds</p>
      </div>

      {/* Quick Setup */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Student Name"
          style={inputStyle}
          value={formData.studentName}
          onChange={(e) => handleChange('studentName', e.target.value)}
        />
        <select
          style={inputStyle}
          value={formData.grade}
          onChange={(e) => handleChange('grade', e.target.value)}
        >
          <option value="">Select Grade</option>
          <option value="K">Kindergarten</option>
          <option value="1st">1st Grade</option>
          <option value="2nd">2nd Grade</option>
          <option value="3rd">3rd Grade</option>
          <option value="4th">4th Grade</option>
          <option value="5th">5th Grade</option>
          <option value="6th">6th Grade</option>
          <option value="7th">7th Grade</option>
          <option value="8th">8th Grade</option>
          <option value="9th">9th Grade</option>
          <option value="10th">10th Grade</option>
          <option value="11th">11th Grade</option>
          <option value="12th">12th Grade</option>
        </select>
        <select
          style={inputStyle}
          value={formData.goalArea}
          onChange={(e) => handleChange('goalArea', e.target.value)}
        >
          <option value="">Select Goal Area</option>
          {goalAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {formData.goalArea && templates[formData.goalArea as keyof typeof templates] && (
          <select
            style={inputStyle}
            value={formData.template}
            onChange={(e) => handleChange('template', e.target.value)}
          >
            <option value="">Choose Template (Optional)</option>
            {templates[formData.goalArea as keyof typeof templates].map(template => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>
        )}
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Left Panel - Input */}
        <div style={panelStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
            Present Level of Performance
          </h3>
          <textarea
            style={textareaStyle}
            placeholder="Paste or type the student's current performance level here. Include:
• What the student can currently do
• Specific challenges or areas of need
• Assessment data or observations
• Strengths to build upon

Example: 'Currently reads 25 sight words with 60% accuracy. Shows strong phonemic awareness but struggles with blending sounds in CVC words. Requires visual supports and repeated practice to retain new vocabulary.'"
            value={formData.presentLevel}
            onChange={(e) => handleChange('presentLevel', e.target.value)}
          />
          
          <div style={{ marginTop: '16px' }}>
            <button 
              onClick={generateGoal} 
              style={{
                ...buttonStyle,
                opacity: !formData.goalArea ? 0.5 : 1,
                cursor: !formData.goalArea ? 'not-allowed' : 'pointer'
              }}
              disabled={!formData.goalArea || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Goal'}
            </button>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
              Generated SMART Goal
            </h3>
            {formData.generatedGoal && (
              <button onClick={copyToClipboard} style={copyButtonStyle}>
                📋 Copy Goal
              </button>
            )}
          </div>
          
          <div style={{
            minHeight: '200px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            {isGenerating ? (
              <div style={{ color: '#64748b', fontStyle: 'italic' }}>
                Generating your customized IEP goal...
              </div>
            ) : formData.generatedGoal ? (
              <div style={{ color: '#1e293b' }}>
                {formData.generatedGoal}
              </div>
            ) : (
              <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                Select a goal area and enter present level information to generate a SMART goal.
              </div>
            )}
          </div>

          {/* Compliance Checker */}
          {complianceWarnings.length > 0 && (
            <div style={warningStyle}>
              <div style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                ⚠️ Compliance Check
              </div>
              {complianceWarnings.map((warning, index) => (
                <div key={index} style={{ fontSize: '14px', color: '#92400e', marginBottom: '4px' }}>
                  • {warning}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Privacy Banner */}
      <div style={privacyBannerStyle}>
        🔒 All text is processed transiently; nothing is stored. 
        <a href="#" style={{ color: '#3b82f6', marginLeft: '8px' }}>FERPA Compliance Policy</a>
      </div>
    </div>
  );
};

export default IEPGoalGenerator;
