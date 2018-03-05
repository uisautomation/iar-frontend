export const DATA_SUBJECT_LABELS = [
  {value: "staff", label: "Staff & applicants"},
  {value: "students", label: "Students & applicants"},
  {value: "alumni", label: "Alumni"},
  {value: "research", label: "Research participants"},
  {value: "patients", label: "Patients"},
  {value: "supplier", label: "Suppliers"},
  {value: "public", label: "Members of the public"},
];

export const DATA_CATEGORY_LABELS = [
  {value: 'education', label: "Education"},
  {value: 'racial', label: "Racial or ethnic origin"},
  {value: 'employment', label: "Employment"},
  {value: 'political', label: "Political opinions"},
  {value: 'financial', label: "Financial"},
  {value: 'unions', label: "Trade union membership"},
  {value: 'social', label: "Lifestyle and social circumstances"},
  {value: 'religious', label: "Religious or similar beliefs"},
  {value: 'visual', label: "Visual images"},
  {value: 'health', label: "Physical or mental health details"},
  {value: 'research', label: "Research data"},
  {value: 'sexual', label: "Sexual life and orientation"},
  {value: 'medical', label: "Medical records"},
  {value: 'genetic', label: "Genetic information"},
  {value: 'children', label: "Data about children 16"},
  {value: 'biometric', label: "Biometric information"},
  {value: 'criminal', label: "Criminal proceedings"},
];

export const RETENTION_LABELS = [
  { value: '<1', label: 'Less than 1 year' },
  { value: '>=1,<=5', label: '1 - 5 years' },
  { value: '>5,<=10', label: '6 - 10 years' },
  { value: '>10,<=75', label: '10 - 75 years' },
  { value: 'forever', label: 'Forever' },
];

export const RISK_TYPE_LABELS = [
  {value: 'financial', label: "The University would be exposed to financial loss by disclosing this information"},
  {value: 'operational', label: "Damage or loss of this information would impact core day-to-day operations."},
  {value: 'safety', label: "Staff or students would be exposed to personal danger if this information was disclosed."},
  {value: 'compliance', label: "The University wouldn't be compliant with all the necessary laws and regulations related to holding this information."},
  {value: 'reputational', label: "The University would receive significant negative publicity"},
];

export const DIGITAL_STORAGE_SECURITY_LABELS = [
  {value: 'pwd_controls', label: "Password controls"},
  {value: 'acl', label: "Access control lists"},
  {value: 'backup', label: "Backup"},
  {value: 'encryption', label: "Encryption"},
];

export const PAPER_STORAGE_SECURITY_LABELS = [
  {value: 'locked_cabinet', label: "Locked filing cabinet"},
  {value: 'safe', label: "Safe"},
  {value: 'locked_room', label: "Locked room"},
  {value: 'locked_building', label: "Locked building"},
];

export const PURPOSE_LABELS = [
  {value: 'teaching', label: 'Teaching'},
  {value: 'research', label: 'Research'},
  {value: 'student_administration', label: 'Student administration'},
  {value: 'staff_administration', label: 'Staff administration (HR)'},
  {value: 'alumni_supporter_administration', label: 'Alumni/supporter administration'},
  {value: 'supplier_customer_administration', label: 'Supplier/customer administration'},
  {value: 'financial_estate_administration', label: 'Financial/estate administration'},
  {value: 'governance_compliance', label: 'Governance/compliance'},
  {value: 'security', label: 'Security'},
  {value: 'marketing', label: 'Marketing'},
  {value: 'public_engagement', label: 'Public engagement'},
  {value: 'other', label: 'Other'},
];
