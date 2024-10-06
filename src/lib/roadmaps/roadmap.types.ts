export interface Step {
    heading: string;
    status: 'Incomplete' | 'Complete';
    details: string;
  }
  
  export interface Roadmap {
    id: string;
    title: string;
    steps: Step[];
  }
  