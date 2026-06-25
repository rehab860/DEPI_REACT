import  { useState, useEffect } from 'react';
const INITIAL_QA = [
    {
        id: 'qa-1',
        companyName: 'Google',
        department: 'Engineering',
        question: 'What is the time complexity of searching in a Trie compared to a Hash Map? When would you use one over the other?',
        answers: [
            'Search in a Trie takes O(L) where L is the key length. Hash Map lookup average is O(1), but hashing the key also takes O(L) time. Trie is highly preferred for autocomplete prefix searches, dictionary matching, and maintaining keys in sorted order.',
            'Trie does not have hash collision issues, but hash maps usually take less memory in simple scenarios.',
        ],
    },
    {
        id: 'qa-2',
        companyName: 'Stripe',
        department: 'Design',
        question: 'How would you design a dashboard that helps merchant users investigate anomalies in payment refunds?',
        answers: [
            'I would focus on clear anomaly indicators, contextual filters (time, location, card network), and actionable inline commands. The visual hierarchy should surface outlier groups and enable merchant risk analyst users to trigger audits in one click.',
        ],
    },
    {
        id: 'qa-3',
        companyName: 'Meta',
        department: 'Product',
        question: 'How would you measure the success of Meta Horizon Workrooms? What KPI metrics would you look at?',
        answers: [
            'KPIs should measure adoption (weekly active workrooms), engagement (average meeting duration, virtual board shares), and customer satisfaction. Long-term metric: percentage of meeting organizers who book a repeat VR session within 14 days.',
        ],
    },
    {
        id: 'qa-4',
        companyName: 'Amazon',
        department: 'Operations',
        question: 'Tell me about a time you had to balance customer satisfaction with operational efficiency constraints in logistics.',
        answers: [
            'The key is setting up clear tiering structures. In one case, we optimized pick-and-pack routing slots which delayed dispatch times by 10 minutes on average but cut operational transport costs by 15%, whilst preserving the customer delivery window guarantee.',
        ],
    },
];
export const InterviewQA = () => {
    const [qaList, setQaList] = useState([]);
    const [selectedDept, setSelectedDept] = useState('All');
    const [expandedQaId, setExpandedQaId] = useState('qa-1'); 
    const [companyName, setCompanyName] = useState('');
    const [department, setDepartment] = useState('Engineering');
    const [question, setQuestion] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [newAnswer, setNewAnswer] = useState('');
    useEffect(() => {
        const stored = localStorage.getItem('reevue_qa_v1');
        if (stored) {
            try {
                setQaList(JSON.parse(stored));
            }
            catch (err) {
                setQaList(INITIAL_QA);
            }
        }
        else {
            setQaList(INITIAL_QA);
            localStorage.setItem('reevue_qa_v1', JSON.stringify(INITIAL_QA));
        }
    }, []);
    const filteredQa = selectedDept === 'All'
        ? qaList
        : qaList.filter((qa) => qa.department === selectedDept);
    const handleToggleExpand = (id) => {
        setExpandedQaId(expandedQaId === id ? null : id);
        setNewAnswer('');
    };
    const handleAddQuestionSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!companyName.trim())
            newErrors.companyName = 'Company name is required';
        if (question.trim().length < 10)
            newErrors.question = 'Question text must be at least 10 characters';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const newQa = {
            id: 'user-qa-' + Date.now(),
            companyName: companyName.trim(),
            department,
            question: question.trim(),
            answers: [],
        };
        const updated = [newQa, ...qaList];
        setQaList(updated);
        localStorage.setItem('reevue_qa_v1', JSON.stringify(updated));
        // Reset Form
        setCompanyName('');
        setQuestion('');
        setFormOpen(false);
        setErrors({});
        setExpandedQaId(newQa.id); 
        alert('Interview question posted successfully!');
    };
    const handleAddAnswerSubmit = (qaId, e) => {
        e.preventDefault();
        if (!newAnswer.trim())
            return;
        const updated = qaList.map((qa) => {
            if (qa.id === qaId) {
                return {
                    ...qa,
                    answers: [...qa.answers, newAnswer.trim()],
                };
            }
            return qa;
        });
        setQaList(updated);
        localStorage.setItem('reevue_qa_v1', JSON.stringify(updated));
        setNewAnswer('');
        alert('Answer posted successfully!');
    };
    return (<div className="section-light-teal py-5 animate-fade-in min-vh-75">
      <div className="container">
        
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h1 className="fw-bold mb-1">Interview Q&A Forum</h1>
            <p className="text-muted small mb-0">Browse real technical, behavioral, and design interview questions asked at top companies</p>
          </div>
          <button onClick={() => setFormOpen(!formOpen)} className="btn btn-primary-teal rounded-pill d-inline-flex align-items-center gap-2">
            <i className={`bi ${formOpen ? 'bi-x-lg' : 'bi-plus-lg'}`}></i>
            <span>{formOpen ? 'Cancel' : 'Add a Question'}</span>
          </button>
        </div>

        {formOpen && (<div className="row justify-content-center mb-4">
            <div className="col-12 col-lg-8">
              <div className="card card-custom p-4 bg-white border-0 animate-fade-in">
                <h5 className="fw-bold text-teal mb-3">Add Interview Question</h5>
                <form onSubmit={handleAddQuestionSubmit}>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="qaCompany" className="form-label small fw-bold text-secondary">Target Company</label>
                      <input type="text" id="qaCompany" className={`form-control bg-light border-0 ${errors.companyName ? 'is-invalid' : ''}`} placeholder="e.g. Google, Stripe" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                      {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="qaDept" className="form-label small fw-bold text-secondary">Department</label>
                      <select id="qaDept" className="form-select bg-light border-0" value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value="Engineering">Engineering</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                        <option value="Operations">Operations</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="qaText" className="form-label small fw-bold text-secondary">Question Details</label>
                    <textarea id="qaText" rows={3} className={`form-control bg-light border-0 ${errors.question ? 'is-invalid' : ''}`} placeholder="What was the exact question asked in the interview loop?" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                    {errors.question && <div className="invalid-feedback">{errors.question}</div>}
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary-teal rounded-pill px-4">
                      Submit Question
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>)}

        <div className="card card-custom p-3 mb-4">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="small text-muted fw-bold d-none d-sm-inline">Department:</span>
            <div className="d-flex flex-wrap gap-2">
              {['All', 'Engineering', 'Product', 'Design', 'Operations', 'Other'].map((dept) => (<button key={dept} type="button" onClick={() => setSelectedDept(dept)} className={`btn btn-sm px-3 rounded-pill transition border-0 ${selectedDept === dept ? 'btn-primary-teal' : 'btn-secondary-custom'}`}>
                  {dept}
                </button>))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            {filteredQa.length > 0 ? (filteredQa.map((qa) => {
            const isExpanded = expandedQaId === qa.id;
            return (<div className="card card-custom mb-3 overflow-hidden border-0 shadow-sm" key={qa.id}>
                    <div onClick={() => handleToggleExpand(qa.id)} className="p-3 px-4 d-flex justify-content-between align-items-center bg-white" style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}>
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-light text-teal border-0 rounded-pill px-2.5 py-1 fw-bold fs-7">
                            {qa.companyName}
                          </span>
                          <span className="badge bg-light text-secondary rounded-pill px-2.5 py-1 fs-7">
                            {qa.department}
                          </span>
                        </div>
                        <h5 className="fw-bold mb-0 text-dark mt-2" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>
                          {qa.question}
                        </h5>
                      </div>
                      <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} text-muted fs-5 ms-3`}></i>
                    </div>

                    {isExpanded && (<div className="p-4 bg-light border-top border-light animate-fade-in">
                        <h6 className="fw-bold mb-3 text-secondary" style={{ fontSize: '0.85rem' }}>
                          COMMUNITY ANSWERS ({qa.answers.length})
                        </h6>

                        {qa.answers.length > 0 ? (<div className="d-flex flex-column gap-3 mb-4">
                            {qa.answers.map((answer, index) => (<div className="p-3 bg-white rounded-3 border-start border-teal border-3 shadow-sm" key={index}>
                                <p className="small text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                                  {answer}
                                </p>
                              </div>))}
                          </div>) : (<div className="text-center py-4 bg-white rounded-3 mb-4 shadow-sm">
                            <i className="bi bi-chat-dots text-muted fs-4 mb-2 d-block"></i>
                            <p className="text-muted small mb-0">No answers posted for this question yet.</p>
                          </div>)}

                        <form onSubmit={(e) => handleAddAnswerSubmit(qa.id, e)} className="card card-custom p-3 shadow-none border-0 bg-white">
                          <label htmlFor={`answerInput-${qa.id}`} className="form-label small fw-bold text-teal mb-2">
                            Share Your Answer
                          </label>
                          <div className="d-flex gap-2">
                            <input type="text" id={`answerInput-${qa.id}`} className="form-control bg-light border-0 rounded-pill py-2 px-3 small" placeholder="Type your explanation or coding code snippet..." value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} style={{ fontSize: '0.85rem' }}/>
                            <button type="submit" className="btn btn-primary-teal rounded-pill btn-sm px-4">
                              Post Answer
                            </button>
                          </div>
                        </form>
                      </div>)}
                  </div>);
        })) : (<div className="text-center py-5 bg-white rounded-3 card-custom">
                <i className="bi bi-chat-square-text text-muted display-4 mb-3 d-block"></i>
                <h5 className="fw-semibold">No questions in this category</h5>
                <p className="text-muted small">Be the first to add an interview question for {selectedDept}!</p>
              </div>)}
          </div>
        </div>

      </div>
    </div>);
};
export default InterviewQA;
