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
      "When presented with 20 sight words at the 2nd grade level, [Student] will read the words correctly within 3 seconds per word with 90% accuracy across 3 consecutive sessions as measured by curriculum-based assessments by [Date]."
    ],
    math: [
      "Given manipulatives and visual supports, [Student] will solve 2-digit addition problems with regrouping with 80% accuracy across 4 out of 5 consecutive trials as measured by teacher data collection by [Date].",
      "When presented with word problems involving time and money, [Student] will identify the relevant information and solve the problem with 75% accuracy across 3 consecutive sessions as measured by curriculum-based assessments by [Date]."
    ],
    behavior: [
      "When experiencing frustration in academic or social situations, [Student] will use appropriate coping strategies (deep breathing, requesting a break, asking for help) instead of disruptive behaviors in 8 out of 10 opportunities across 5 consecutive school days as measured by teacher data collection by [Date].",
      "During structured activities, [Student] will remain in assigned area and follow adult directions within 30 seconds of initial request with 85% accuracy across 4 out of 5 consecutive sessions as measured by teacher observation by [Date]."
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">IEP Goal Generator</h1>
          <p className="text-gray-600">AI-powered tool to create legally compliant, measurable IEP goals</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <span className="text-gray-400 mx-2">→</span>
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-96 mb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Student Profile</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Student Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.studentInfo.name}
                    onChange={(e) => handleInputChange('studentInfo', 'name', e.target.value)}
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Grade Level</label>
                  <select
                    className="w-full p-3 border rounded-lg"
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
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Select Goal Area</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {goalAreas.map(area => (
                  <div
                    key={area.id}
                    onClick={() => handleDirectChange('goalArea', area.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.goalArea === area.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold">{area.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Generated Goals</h3>
              {generatedGoals.length === 0 ? (
                <div className="text-center py-8">
                  <button
                    onClick={generateGoals}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Generate Goals
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedGoals.map((goal, index) => (
                    <div key={index} className="bg-white p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Goal Option {index + 1}</h4>
                      <p className="text-gray-700">{goal}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            disabled={currentStep === 6}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default IEPGoalGeneratorWorkflow;
