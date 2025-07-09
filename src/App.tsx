import React, { useState } from 'react';
import { ChevronRight, User, Target, BookOpen, Brain, Users, ArrowRight, FileText, CheckCircle } from 'lucide-react';

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

  const [generatedGoals, setGeneratedGoals] = useState([]);

  const steps = [
    { id: 1, title: "Student Profile", icon: User },
    { id: 2, title: "Goal Area", icon: Target },
    { id: 3, title: "Assessment Data", icon: BookOpen },
    { id: 4, title: "Present Level", icon: Brain },
    { id: 5, title: "Target Skill", icon: Users },
    { id: 6, title: "Generate Goals", icon: FileText }
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

  const sampleGoals = {
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
    ]
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
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

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
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
                <label className="block text-sm font-medium mb-2">Primary Disability</label>
                <select
                  className="w-full p-3 border rounded-lg"
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
                <label className="block text-sm font-medium mb-2">Current Performance Level</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.studentInfo.currentLevel}
                  onChange={(e) => handleInputChange('studentInfo', 'currentLevel', e.target.value)}
                  placeholder="e.g., 2nd grade reading level"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
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
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Assessment Data</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Recent Assessment Results</label>
              <textarea
                className="w-full p-3 border rounded-lg h-32"
                value={formData.assessmentData}
                onChange={(e) => handleDirectChange('assessmentData', e.target.value)}
                placeholder="Enter recent assessment data, test scores, or evaluation results that inform this goal area..."
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">AI Will Use This To:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Set appropriate baseline levels</li>
                <li>• Determine realistic target criteria</li>
                <li>• Suggest evidence-based interventions</li>
                <li>• Align with current performance data</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Present Level of Performance</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Current Abilities in This Area</label>
              <textarea
                className="w-full p-3 border rounded-lg h-32"
                value={formData.presentLevel}
                onChange={(e) => handleDirectChange('presentLevel', e.target.value)}
                placeholder="Describe what the student can currently do in this goal area. Include strengths, challenges, and specific examples..."
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Example Present Level:</h4>
              <p className="text-sm text-green-700">
                "Currently reads 45 sight words from the Dolch Pre-Primer and Primer lists with 75% accuracy. 
                Demonstrates strong phonemic awareness but struggles with blending sounds in CVC words. 
                Requires visual supports and repeated practice to retain new vocabulary."
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Target Skill & Conditions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Target Skill/Behavior</label>
                <textarea
                  className="w-full p-3 border rounded-lg h-24"
                  value={formData.targetSkill}
                  onChange={(e) => handleDirectChange('targetSkill', e.target.value)}
                  placeholder="What specific skill should the student master?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Conditions/Supports</label>
                <textarea
                  className="w-full p-3 border rounded-lg h-24"
                  value={formData.conditions}
                  onChange={(e) => handleDirectChange('conditions', e.target.value)}
                  placeholder="What supports, materials, or conditions will be provided?"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Success Criteria</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={formData.criteria}
                onChange={(e) => handleDirectChange('criteria', e.target.value)}
                placeholder="e.g., 80% accuracy across 4 out of 5 consecutive trials"
              />
            </div>
          </div>
        );

      case 6:
        return (
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
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">Goal Option {index + 1}</h4>
                        <p className="text-gray-700">{goal}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="text-green-600 hover:text-green-800">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">
                          <FileText className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Review and customize goals for your student</li>
                    <li>• Add to IEP document with proper dates</li>
                    <li>• Set up data collection system</li>
                    <li>• Share with team members</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
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
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
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

        {/* Current Step Content */}
        <div className="min-h-96">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            disabled={currentStep === 6}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IEPGoalGeneratorWorkflow;
