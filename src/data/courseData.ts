export interface LessonSection {
  id: string;
  title: string;
  subtopicTag: string;
  conceptSummary: string;
  content: string[];
  codeExample: {
    title: string;
    code: string;
    explanation: string;
    expectedOutput: string;
  };
  proTip?: string;
  commonPitfall?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  aiContext: string;
}

export interface InteractiveExercise {
  title: string;
  instruction: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
  testCaseDescription: string;
  expectedOutput: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  category: 'Foundation' | 'Core Python' | 'Data & Structures' | 'AI Engineering';
  aiRelevance: string;
  imageVisual?: string;
  keyTakeaways: string[];
  sections: LessonSection[];
  exercise: InteractiveExercise;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  cheatSheet: { label: string; snippet: string; note: string }[];
}

export const COURSE_MODULES: CourseModule[] = [
  // ==========================================
  // MODULE 1: SETUP & MODERN TOOLING
  // ==========================================
  {
    id: 'module-1-setup',
    number: 1,
    title: 'Setup & Modern Tooling',
    subtitle: 'Python 3.12+, VS Code, Workspaces, Virtual Environments, and Modern Package Management with uv',
    duration: '45 min',
    category: 'Foundation',
    aiRelevance: 'AI libraries (PyTorch, OpenAI, Hugging Face, Transformers) have complex dependencies. A clean virtual environment setup and lightning-fast package management with uv prevents dependency hell and broken CUDA/C++ builds.',
    imageVisual: '/src/assets/images/illustration_uv_tooling_1791572999993.jpg',
    keyTakeaways: [
      'Install and verify modern Python 3.12+ across Windows, macOS, and Linux',
      'Configure VS Code with must-have AI extensions: Pylance, Ruff, and Python',
      'Understand why virtual environments (.venv) isolate conflicting package dependencies',
      'Adopt Astral uv: the 10x-100x faster modern alternative to pip, poetry, and conda',
      'Establish a standard production-ready AI project directory structure'
    ],
    sections: [
      {
        id: '1-1-python-installation',
        title: 'Installing Python & Verifying the Installation',
        subtopicTag: 'Installation & Verification',
        conceptSummary: 'Modern AI workflows require Python 3.10+ (ideally 3.12+). Always verify your terminal path points to the expected interpreter version.',
        content: [
          'Python is an interpreted, high-level programming language. In AI engineering, it coordinates low-level C++/CUDA computing engines while providing an expressive developer interface.',
          'Verify your installation in your terminal using `python --version` or `python3 --version`. Ensure your version is >= 3.11 to enjoy significant bytecode optimizations and refined error tracebacks.',
          'Always check your path location with `which python` (macOS/Linux) or `where python` (Windows) to verify which interpreter binary is active.'
        ],
        codeExample: {
          title: 'Verifying Python Runtime & Platform Info',
          code: `import sys
import platform

print("Python Version:", sys.version.split()[0])
print("Platform Architecture:", platform.machine())
print("Executable Path:", sys.executable)
print("Byteorder:", sys.byteorder)`,
          explanation: 'sys and platform inspect your active runtime to guarantee scripts execute inside your dedicated virtual environment rather than a global OS interpreter.',
          expectedOutput: `Python Version: 3.12.2
Platform Architecture: x86_64
Executable Path: /workspace/.venv/bin/python
Byteorder: little`
        },
        proTip: 'Never install AI packages directly into your global system Python. Global installations cause conflicting versions between libraries like NumPy 1.x and NumPy 2.x.',
        commonPitfall: 'Running `python` instead of `python3` on older macOS/Linux distributions may invoke a legacy Python 2.7 runtime.'
      },
      {
        id: '1-2-vscode-setup',
        title: 'VS Code Setup, Extensions & Customization',
        subtopicTag: 'VS Code & Extensions',
        conceptSummary: 'Configure VS Code for high-velocity AI development with Python, Pylance, Ruff, and Error Lens extensions.',
        content: [
          'Visual Studio Code is the industry standard editor for Python AI development. It offers first-class debugging, interactive execution, and terminal integration.',
          'Must-have extensions for AI Engineers: Python (by Microsoft), Pylance (fast type checking & autocomplete), Ruff (instant linting & formatting), and Error Lens (highlights bugs inline).',
          'Configure format-on-save in settings.json to format your code cleanly using Ruff on every save.'
        ],
        codeExample: {
          title: 'Simulating VS Code Extension & Workspace Verification',
          code: `recommended_extensions = [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "charliermarsh.ruff",
    "usernamehw.errorlens"
]

print("Essential VS Code Extensions for AI Engineers:")
for ext in recommended_extensions:
    print(f"  • {ext}")
print("\\nReady for typed AI development!")`,
          explanation: 'Configuring recommended extensions in .vscode/extensions.json ensures team members have identical developer tooling.',
          expectedOutput: `Essential VS Code Extensions for AI Engineers:
  • ms-python.python
  • ms-python.vscode-pylance
  • charliermarsh.ruff
  • usernamehw.errorlens

Ready for typed AI development!`
        }
      },
      {
        id: '1-3-virtual-environments-and-uv',
        title: 'Virtual Environments: From venv to Astral uv',
        subtopicTag: 'Virtual Environments & uv',
        conceptSummary: 'Isolated virtual environments prevent conflicting package versions. Astral uv resolves and installs Python packages in milliseconds.',
        content: [
          'A virtual environment is a lightweight, isolated directory tree (.venv) that contains its own Python executable and site-packages folder.',
          'Traditional workflow: `python -m venv .venv` followed by `source .venv/bin/activate`. Then using `pip install openai pandas`.',
          'Modern AI Engineer workflow: Use Astral `uv` written in Rust. It replaces pip, pip-tools, virtualenv, and pyenv with 10x-100x faster operations and reproducible lockfiles.',
          'Key uv commands to memorize: `uv init` creates a project, `uv venv` creates an environment, `uv add openai` installs and updates `pyproject.toml`, and `uv run main.py` runs inside the virtual environment without manual activation.'
        ],
        codeExample: {
          title: 'Detecting Active Virtual Environment',
          code: `import sys
import os

is_venv = hasattr(sys, 'real_prefix') or (
    hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix
)

env_path = sys.prefix
print(f"Isolated Environment Active: {is_venv}")
print(f"Prefix Directory: {os.path.basename(env_path)}")
print("Ready to install AI dependencies cleanly!")`,
          explanation: 'sys.prefix differs from sys.base_prefix whenever a virtual environment is active.',
          expectedOutput: `Isolated Environment Active: True
Prefix Directory: .venv
Ready to install AI dependencies cleanly!`
        },
        proTip: 'Always add `.venv` to your `.gitignore`. Commit `pyproject.toml` or `requirements.txt`, never the raw installed packages.',
        commonPitfall: 'Forgetting to activate your environment before running pip install in traditional setups. With `uv run`, activation is handled automatically.'
      },
      {
        id: '1-4-first-project-running-code',
        title: 'Your First Python Project & Execution Workflows',
        subtopicTag: 'Running Python & Workspaces',
        conceptSummary: 'Understand interactive vs script execution: running python files via the terminal, Code Runner, and interactive Jupyter notebooks.',
        content: [
          'Create a project directory and a file named `hello.py`. Write `print("Hello AI World!")`.',
          'Run via terminal: `uv run hello.py` or `python hello.py`.',
          'Interactive Python with Jupyter: Use `.ipynb` notebook files for exploratory data analysis, plotting loss curves, and testing quick prompt templates before converting logic to modular `.py` files.'
        ],
        codeExample: {
          title: 'Interactive vs Script Execution Lifecycle',
          code: `import time

start = time.perf_counter()
print("Hello, AI Engineering!")
print("Script execution completed.")
duration_ms = (time.perf_counter() - start) * 1000
print(f"Elapsed time: {duration_ms:.2f}ms")`,
          explanation: 'Running standalone Python scripts compiles source text to bytecode (.pyc) and executes sequentially from top to bottom.',
          expectedOutput: `Hello, AI Engineering!
Script execution completed.
Elapsed time: 0.15ms`
        }
      }
    ],
    exercise: {
      title: 'Practice: Build an Environment Verifier',
      instruction: 'Write a Python script that checks whether the Python version is at least 3.10 and prints "Environment Ready for AI" or "Upgrade Python".',
      starterCode: `import sys

major = sys.version_info.major
minor = sys.version_info.minor

# TODO: Check if major == 3 and minor >= 10
# Print the version and the confirmation message
`,
      solutionCode: `import sys

major = sys.version_info.major
minor = sys.version_info.minor

print(f"Current Python: {major}.{minor}")
if major == 3 and minor >= 10:
    print("Environment Ready for AI")
else:
    print("Upgrade Python to 3.10+")`,
      hint: 'Use sys.version_info.major and sys.version_info.minor with an if statement.',
      testCaseDescription: 'Prints version and Environment Ready for AI',
      expectedOutput: `Current Python: 3.12\nEnvironment Ready for AI`
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'Why should you never install AI packages into your global system Python?',
        options: [
          'Global Python executes code significantly slower than virtual environments',
          'Conflicting package versions (e.g. NumPy 1.x vs 2.x) can break OS tools and other projects',
          'Global Python cannot access network connections or download models',
          'Python does not allow packages to be installed globally'
        ],
        correctIndex: 1,
        explanation: 'Virtual environments prevent dependency clashes. Different AI projects frequently require conflicting versions of libraries like PyTorch, NumPy, or LangChain.'
      },
      {
        id: 'q1-2',
        question: 'What makes Astral uv preferred over traditional pip for modern Python development?',
        options: [
          'It replaces Python with C++',
          'It is written in Rust and resolves/installs dependencies 10x-100x faster with unified lockfiles',
          'It is only usable for machine learning datasets',
          'It automatically writes unit tests for you'
        ],
        correctIndex: 1,
        explanation: 'uv provides blazing-fast dependency resolution, project management, and reproducible environments built in Rust.'
      }
    ],
    flashcards: [
      {
        id: 'fc1-1',
        front: 'What does a Python Virtual Environment (.venv) do?',
        back: 'An isolated directory holding a dedicated Python interpreter and site-packages, preventing dependency version conflicts across projects.',
        aiContext: 'Crucial for managing conflicting AI dependencies like PyTorch, Hugging Face, and LangChain.'
      },
      {
        id: 'fc1-2',
        front: 'What command in uv installs a new package and updates pyproject.toml?',
        back: 'uv add <package_name> (e.g., `uv add openai`)',
        aiContext: 'Replaces `pip install` + manually updating requirements.txt.'
      }
    ],
    cheatSheet: [
      { label: 'Check Python version', snippet: 'python --version', note: 'Verify >= 3.10' },
      { label: 'Create venv with uv', snippet: 'uv venv', note: 'Creates .venv directory' },
      { label: 'Install package with uv', snippet: 'uv add openai pydantic', note: 'Fast install + lock' },
      { label: 'Run script in venv', snippet: 'uv run main.py', note: 'Runs in isolated env' }
    ]
  },

  // ==========================================
  // MODULE 2: FUNDAMENTALS & CLEAN SYNTAX
  // ==========================================
  {
    id: 'module-2-fundamentals',
    number: 2,
    title: 'Fundamentals & Clean Syntax',
    subtitle: 'PEP 8 Conventions, Dynamic Typing, Variables, Comments, Docstrings, and Error Diagnostics',
    duration: '45 min',
    category: 'Core Python',
    aiRelevance: 'AI codebases require absolute clarity. Well-named variables and PEP 8 compliance make prompt templates, token counters, and pipeline parameters readable, while understanding Python error traces is key to debugging model timeouts and schema mismatches.',
    keyTakeaways: [
      'Master Python syntax: indentation as syntax, indentation rules, and PEP 8 style guide',
      'Understand dynamic typing, variable assignment, and object memory addresses',
      'Write informative comments (#) and multiline docstrings for AI functions',
      'Read and decode common Python exceptions: SyntaxError, NameError, and TypeError',
      'Use descriptive naming conventions for AI model inputs and outputs'
    ],
    sections: [
      {
        id: '2-1-syntax-and-pep8',
        title: 'Indentation, Whitespace & PEP 8 Style Guide',
        subtopicTag: 'PEP 8 & Formatting',
        conceptSummary: 'Python uses indentation (4 spaces) rather than curly braces to define code blocks. Following PEP 8 makes your code clean and industry-standard.',
        content: [
          'In languages like JavaScript or C++, blocks are defined by curly braces {}. In Python, blocks are defined strictly by indentation (standard: 4 spaces per indent level).',
          'PEP 8 is the official Python style guide: snake_case for functions and variables, PascalCase for classes, and UPPER_CASE for constants.',
          'Line length: Keep lines within 88-100 characters for readability, especially when formatting long LLM system prompts.'
        ],
        codeExample: {
          title: 'Clean PEP 8 Compliant Python Structure',
          code: `# PEP 8 Constants
DEFAULT_MODEL_NAME = "gpt-4o-mini"
MAX_OUTPUT_TOKENS = 1024

def format_prompt(system_role: str, user_query: str) -> str:
    """Format a system instructions header and user message.
    
    Args:
        system_role: Persona instruction for the model.
        user_query: The incoming prompt from the user.
    """
    cleaned_query = user_query.strip()
    return f"[{system_role.upper()}]\\nQuery: {cleaned_query}"

prompt = format_prompt("assistant", "   Explain vector embeddings   ")
print(prompt)`,
          explanation: 'Notice 4-space indentation, snake_case function name, uppercase constant, and clear docstrings. This standard structure is expected across all AI production repositories.',
          expectedOutput: `[ASSISTANT]
Query: Explain vector embeddings`
        },
        proTip: 'Use Ruff as your automated formatter in VS Code. On every file save, Ruff enforces PEP 8 instantaneously.',
        commonPitfall: 'Mixing tabs and spaces causes IndentationError: unindent does not match any outer indentation level.'
      },
      {
        id: '2-2-variables-and-memory',
        title: 'Variables, Dynamic Typing & Memory References',
        subtopicTag: 'Variables & Typing',
        conceptSummary: 'In Python, variables are names pointing to objects in memory, not fixed type boxes. Types are bound to the values, not the variable names.',
        content: [
          'Dynamic Typing means you do not need to declare a variable type before assigning a value: `model = "claude"` and later `model = 4` is legal Python, though generally discouraged in clean code.',
          'Variables in Python are object references. When you execute `a = [1, 2, 3]` and `b = a`, both `a` and `b` point to the exact same list in memory! Mutating `b` also mutates `a`.',
          'To create an independent copy, use `b = a.copy()` or `copy.deepcopy()`.'
        ],
        codeExample: {
          title: 'Understanding Object References & Immutability',
          code: `chat_history_a = ["User: Hello"]
chat_history_b = chat_history_a  # Shallow reference!
chat_history_b.append("Assistant: Hi there!")

print("History A:", chat_history_a)
print("Are they identical objects?", chat_history_a is chat_history_b)

# Proper independent copy:
independent_copy = chat_history_a.copy()
independent_copy.append("User: New message")
print("Independent Copy length:", len(independent_copy))
print("Original History A length:", len(chat_history_a))`,
          explanation: 'Because lists are mutable, assigning chat_history_b = chat_history_a creates a shared pointer. Using .copy() creates a new list in memory, protecting the original state.',
          expectedOutput: `History A: ['User: Hello', 'Assistant: Hi there!']
Are they identical objects? True
Independent Copy length: 3
Original History A length: 2`
        }
      },
      {
        id: '2-3-comments-and-docstrings',
        title: 'Comments & Function Docstrings (PEP 257)',
        subtopicTag: 'Comments & Documentation',
        conceptSummary: 'Single line comments (#) explain why, not what. Docstrings (""") document function purpose and parameters for AI tool calling.',
        content: [
          'Single-line comments start with `#`. Use them to explain non-obvious business logic, workarounds, or mathematical formulas.',
          'Docstrings: Triple-quoted strings placed immediately after a function or class definition.',
          'Why docstrings matter in AI: LLM tool calling libraries (e.g. Instructor, LangChain, OpenAI Tools) parse function docstrings and pass them to the AI model so it understands when and how to call your tool.'
        ],
        codeExample: {
          title: 'Documenting a Tool Calling Function with Docstrings',
          code: `def calculate_embedding_cost(text: str, cost_per_1k_tokens: float = 0.0001) -> float:
    """Calculate the estimated embedding API cost for an input string.
    
    Args:
        text: The source text to be embedded into vector space.
        cost_per_1k_tokens: Cost per thousand tokens for the embedding model.
        
    Returns:
        Estimated dollar cost formatted as a float.
    """
    token_count = len(text.split()) * 1.3
    return (token_count / 1000) * cost_per_1k_tokens

doc_text = "Dense vectors represent semantic relationships in high-dimensional space."
cost = calculate_embedding_cost(doc_text)
print(f"Estimated Cost: \${cost:.6f}")
print("Docstring preview:", calculate_embedding_cost.__doc__.splitlines()[0])`,
          explanation: 'Accessing func.__doc__ lets runtime introspection tools automatically generate JSON schemas for LLMs.',
          expectedOutput: `Estimated Cost: $0.000001
Docstring preview: Calculate the estimated embedding API cost for an input string.`
        }
      },
      {
        id: '2-4-error-diagnostics',
        title: 'Reading Python Stack Traces & Error Diagnostics',
        subtopicTag: 'Error Types & Debugging',
        conceptSummary: 'Errors in Python are structured tracebacks. Reading from bottom to top quickly reveals the exact line and failure cause.',
        content: [
          'When Python throws an unhandled exception, it outputs a stack trace. The most informative line is the very LAST line, which indicates the Exception type and the error message.',
          'Common exceptions in AI scripting:',
          '• TypeError: Passing the wrong data type (e.g., trying to slice an integer or concatenating int + str).',
          '• NameError: Using a variable or function name that has not been defined yet.',
          '• KeyError: Looking up a dictionary key that does not exist (e.g. response["choices"]).',
          '• AttributeError: Calling a method that the object does not have (e.g. None.strip()).'
        ],
        codeExample: {
          title: 'Safe Key Lookup & Type Verification',
          code: `api_payload = {
    "model": "gpt-4o",
    "temperature": 0.7,
}

# Demonstrating safe lookup vs KeyError
temperature = api_payload.get("temperature", 1.0)
max_tokens = api_payload.get("max_tokens", 2048)  # Safe default fallback

print("Temperature:", temperature)
print("Max tokens (fallback used):", max_tokens)
print("Type of temperature:", type(temperature).__name__)`,
          explanation: 'Using .get(key, default) avoids crashing your program with a KeyError when optional parameters are missing from an API payload.',
          expectedOutput: `Temperature: 0.7
Max tokens (fallback used): 2048
Type of temperature: float`
        }
      }
    ],
    exercise: {
      title: 'Practice: Safe Parameter Extractor',
      instruction: 'Write a function get_model_config(config_dict) that safely extracts model (default: "gemini-pro") and temperature (default: 0.7) and prints them in format: "Model: <name> | Temp: <temp>".',
      starterCode: `def get_model_config(config_dict):
    # TODO: Safely extract 'model' and 'temperature' using .get() with defaults
    # Print the formatted string
    pass

# Test call:
get_model_config({"model": "claude-3-5-sonnet"})`,
      solutionCode: `def get_model_config(config_dict):
    model = config_dict.get("model", "gemini-pro")
    temperature = config_dict.get("temperature", 0.7)
    result = f"Model: {model} | Temp: {temperature}"
    print(result)
    return result

get_model_config({"model": "claude-3-5-sonnet"})`,
      hint: 'Use config_dict.get("key", default_value) to prevent KeyErrors.',
      testCaseDescription: 'Safely falls back to default temperature when only model is provided.',
      expectedOutput: `Model: claude-3-5-sonnet | Temp: 0.7`
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'What happens if you run: list_a = [1]; list_b = list_a; list_b.append(2)?',
        options: [
          'list_a remains [1] because Python copies values automatically',
          'list_a becomes [1, 2] because both variables reference the exact same list in memory',
          'Python raises an AssignmentError',
          'list_b is converted into a tuple'
        ],
        correctIndex: 1,
        explanation: 'Variables in Python hold references to objects. When assigned with =, both point to the same list object in memory unless an explicit copy is made.'
      }
    ],
    flashcards: [
      {
        id: 'fc2-1',
        front: 'What does PEP 8 recommend for function and variable naming?',
        back: 'snake_case (lowercase letters with words separated by underscores, e.g., format_prompt, max_tokens).',
        aiContext: 'Standard convention across NumPy, PyTorch, and OpenAI libraries.'
      },
      {
        id: 'fc2-2',
        front: 'What is the safe way to read a dictionary key without triggering a KeyError?',
        back: 'my_dict.get("key_name", default_value)',
        aiContext: 'Essential when parsing unpredictable JSON responses from LLM APIs.'
      }
    ],
    cheatSheet: [
      { label: 'Dict safe get', snippet: 'data.get("role", "user")', note: 'Avoids KeyError' },
      { label: 'Check object identity', snippet: 'a is b', note: 'Checks memory address' },
      { label: 'List shallow copy', snippet: 'new_list = old_list.copy()', note: 'Prevents mutation' },
      { label: 'Type inspection', snippet: 'isinstance(val, str)', note: 'Verify type at runtime' }
    ]
  },

  // ==========================================
  // MODULE 3: DATA TYPES & OPERATIONS
  // ==========================================
  {
    id: 'module-3-datatypes',
    number: 3,
    title: 'Data Types & Operations',
    subtitle: 'Numbers, Arithmetic (+, -, *, /, //, %, **), Shortcut Assignments (+=), Strings, f-strings, NLP Methods, Booleans & None',
    duration: '55 min',
    category: 'Core Python',
    aiRelevance: 'LLMs are fundamental text processors. Mastery of strings, multiline prompt formatting, f-strings, token parsing, arithmetic operations for batching and token billing, and boolean guards is the everyday bread-and-butter of AI Engineering.',
    keyTakeaways: [
      'Master numbers (int, float) and all arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), floor division (//), modulo (%), exponentiation (**)',
      'Use shortcut assignments (+=, -=, *=, /=, //=, %=, **=) for accumulator loops and token tallies',
      'Format dynamic prompts with modern Python f-strings and format specifiers (:.2f, :.1%, :,)',
      'Master string methods crucial for NLP: .strip(), .lower(), .replace(), .split(), .join(), .startswith()',
      'Understand Python truthiness and handle NoneType gracefully when dealing with optional model parameters'
    ],
    sections: [
      {
        id: '3-1-numbers-and-types',
        title: 'Numbers: Integers (int) & Floating-Point (float)',
        subtopicTag: 'Numbers & Types',
        conceptSummary: 'Python supports arbitrary-precision integers and double-precision IEEE 754 floats. Scientific notation is frequently used for learning rates and thresholds.',
        content: [
          'Integers (`int`): Whole numbers without decimal points. Python integers can be arbitrarily large without overflowing 64-bit limits.',
          'Floats (`float`): Numbers with decimal points. Floating-point numbers have finite precision (e.g. `0.1 + 0.2 != 0.3` due to binary fraction approximation).',
          'Scientific notation: `1e-4` represents $0.0001$, standard for machine learning learning rates (e.g. `learning_rate = 3e-5`).'
        ],
        codeExample: {
          title: 'Working with Ints, Floats & Scientific Notation',
          code: `batch_count = 100               # int
learning_rate = 5e-4            # float (0.0005)
temperature = 0.7               # float
token_cost = 0.000002           # float

print(f"Batch count: {batch_count} ({type(batch_count).__name__})")
print(f"Learning rate: {learning_rate} ({type(learning_rate).__name__})")
print(f"Rounded temp: {round(temperature, 1)}")`,
          explanation: 'Understanding float vs int prevents subtle bugs when slicing dataset indices (which must strictly be integers).',
          expectedOutput: `Batch count: 100 (int)
Learning rate: 0.0005 (float)
Rounded temp: 0.7`
        }
      },
      {
        id: '3-2-arithmetic-operators',
        title: 'Arithmetic Operators: +, -, *, /, //, %, **',
        subtopicTag: 'Addition & Arithmetic',
        conceptSummary: 'Master all mathematical operators in Python: Addition (+), Subtraction (-), Multiplication (*), Division (/), Floor Division (//), Modulo (%), and Exponentiation (**).',
        content: [
          'Addition (`+`): Adds two numbers (`10 + 5 = 15`). In strings and lists, `+` performs concatenation.',
          'Subtraction (`-`): Subtracts right operand from left (`10 - 4 = 6`).',
          'Multiplication (`*`): Multiplies numbers (`4 * 8 = 32`). For strings, `*` repeats text (`"-" * 20`).',
          'Float Division (`/`): Always returns a float, even if evenly divisible (`10 / 2 = 5.0`).',
          'Floor / Integer Division (`//`): Discards remainder and rounds down to nearest integer (`10 // 3 = 3`). Vital for batch calculations.',
          'Modulo (`%`): Computes remainder of division (`10 % 3 = 1`). Vital for running tasks every Nth step.',
          'Exponentiation (`**`): Raises to power (`2 ** 10 = 1024`). Used in exponential backoff algorithms.'
        ],
        codeExample: {
          title: 'All Arithmetic Operators Demonstrated in AI Context',
          code: `# 1. Addition & Subtraction: calculating net tokens
prompt_tokens = 450
completion_tokens = 150
total_tokens = prompt_tokens + completion_tokens      # Addition (+)
remaining_quota = 1000 - total_tokens                 # Subtraction (-)

# 2. Multiplication & Division: Cost calculation
cost_per_token = 0.000002
total_cost = total_tokens * cost_per_token            # Multiplication (*)
cost_per_message = total_cost / 2                     # Float Division (/)

# 3. Floor Division (//) & Modulo (%): Batch processing
total_documents = 250
batch_size = 32
num_full_batches = total_documents // batch_size      # Floor Division (//)
leftover_docs = total_documents % batch_size          # Modulo (%)

# 4. Exponentiation (**): Exponential Backoff wait time
retry_attempt = 3
backoff_seconds = 2 ** retry_attempt                  # Exponentiation (**)

print(f"Total Tokens (+): {total_tokens}")
print(f"Remaining Quota (-): {remaining_quota}")
print(f"Total Cost (*): \${total_cost:.6f}")
print(f"Cost per message (/): \${cost_per_message:.6f}")
print(f"Full Batches (//): {num_full_batches}")
print(f"Leftover Docs (%): {leftover_docs}")
print(f"Backoff Wait (**): {backoff_seconds}s")`,
          explanation: 'Every arithmetic operator has direct applications in batching, pricing, and retry policies in AI engineering.',
          expectedOutput: `Total Tokens (+): 600
Remaining Quota (-): 400
Total Cost (*): $0.001200
Cost per message (/): $0.000600
Full Batches (//): 7
Leftover Docs (%): 26
Backoff Wait (**): 8s`
        },
        proTip: 'Remember operator precedence: ** has highest precedence, then *, /, //, %, then +, -. Use parentheses () to enforce explicit order.',
        commonPitfall: 'Using / when you need list indexing. Indexing with `my_list[len(my_list) / 2]` raises TypeError: list indices must be integers. Use `//` instead.'
      },
      {
        id: '3-3-shortcut-assignments',
        title: 'Shortcut / Augmented Assignments: +=, -=, *=, /=',
        subtopicTag: 'Shortcut Assignments (+=)',
        conceptSummary: 'Augmented assignment operators combine an arithmetic operation with assignment in a clean, concise statement.',
        content: [
          'Shortcut assignment syntax: `x += 5` is shorthand for `x = x + 5`.',
          '`+=`: Add and assign (accumulate token tallies, word counts, or retry attempt counts).',
          '`-=`: Subtract and assign (decrementing remaining budget or attempts).',
          '`*=`: Multiply and assign (scaling learning rates or factors).',
          '`/=`: Divide and assign (halving batch size on out-of-memory).',
          '`//=` and `%=`: Floor divide and assign, or modulo and assign.',
          '`**=`: Power and assign (`retry_delay *= 2` or `factor **= 2`).'
        ],
        codeExample: {
          title: 'Using += and -= for Token Budget Tracking',
          code: `token_budget = 5000
tokens_used = 0

# Stream chunks and accumulate
chunk_sizes = [120, 85, 240, 110]
for chunk in chunk_sizes:
    tokens_used += chunk            # Shortcut Addition (+=)
    token_budget -= chunk           # Shortcut Subtraction (-=)

print("Accumulated Tokens Used (+=):", tokens_used)
print("Remaining Token Budget (-=):", token_budget)`,
          explanation: '+= cleanly accumulates totals across loops without repeating variable names.',
          expectedOutput: `Accumulated Tokens Used (+=): 555
Remaining Token Budget (-=): 4445`
        }
      },
      {
        id: '3-4-strings-and-fstrings',
        title: 'Strings, Slicing & Modern f-Strings for Prompts',
        subtopicTag: 'Strings & f-strings',
        conceptSummary: 'Prompt engineering relies heavily on string manipulation. Python f-strings enable clean, dynamic injection of variables and expressions.',
        content: [
          'Strings in Python are immutable sequences of Unicode characters.',
          'String indexing: `text[0]` gets first character; `text[-1]` gets last character.',
          'String slicing: `text[start:stop:step]`. Example: `text[:50]` gets first 50 chars; `text[::-1]` reverses string.',
          'f-Strings (formatted string literals): prefix string with `f` and embed variables or expressions inside curly braces `{}`.',
          'Format specifiers: `{val:.2f}` rounds float to 2 decimals, `{val:.1%}` formats as percent, `{count:,}` adds comma separators (e.g. 1,000,000).'
        ],
        codeExample: {
          title: 'Dynamic Prompt Templating with f-Strings & Specifiers',
          code: `client_name = "Alex"
model = "gpt-4o"
confidence = 0.9456
cost = 0.00234
tokens_processed = 1250000

system_prompt = f"""You are a specialized AI assistant.
Client: {client_name}
Active Model: {model.upper()}
Target Accuracy: {confidence:.1%}
Processed Tokens: {tokens_processed:,}
Total Run Cost: \${cost:.4f}"""

print(system_prompt)`,
          explanation: 'Triple-quoted f-strings allow natural multiline prompts without messy string concatenation or newline escaping.',
          expectedOutput: `You are a specialized AI assistant.
Client: Alex
Active Model: GPT-4O
Target Accuracy: 94.6%
Processed Tokens: 1,250,000
Total Run Cost: $0.0023`
        }
      },
      {
        id: '3-5-nlp-string-methods',
        title: 'Essential String Methods for NLP & Text Preprocessing',
        subtopicTag: 'String Methods (.strip, .split)',
        conceptSummary: 'Cleaning raw text before sending it to an LLM or embedding model saves tokens and prevents parsing errors.',
        content: [
          '`.strip()`, `.lstrip()`, `.rstrip()`: Removes leading and trailing whitespace, newlines, and tabs.',
          '`.lower()` / `.upper()`: Normalizes text casing for keyword matching.',
          '`.split(delimiter)`: Splits a string into a list of strings by whitespace or a specific separator.',
          '`.join(iterable)`: Assembles a list of words or lines back into a single string.',
          '`.replace(old, new, count)`: Substitutes patterns, useful for sanitizing markdown fences and special tokens.',
          '`.startswith()` / `.endswith()`: Tests prefix or suffix cleanly.'
        ],
        codeExample: {
          title: 'Cleaning LLM Markdown Output with String Methods',
          code: `raw_response = "  \`\`\`json\\n{\\"answer\\": \\"fine-tuning\\", \\"score\\": 0.9}\\n\`\`\`  "

# Step 1: Strip surrounding whitespace
cleaned = raw_response.strip()

# Step 2: Remove markdown code block fences
if cleaned.startswith("\`\`\`json"):
    cleaned = cleaned.replace("\`\`\`json", "", 1)
if cleaned.endswith("\`\`\`"):
    cleaned = cleaned[:-3]

cleaned_json = cleaned.strip()
print("Cleaned JSON String:")
print(cleaned_json)

# Step 3: Split into lines and rejoin
lines = cleaned_json.split("\\n")
print(f"Parsed {len(lines)} JSON lines cleanly.")`,
          explanation: 'Combining .strip(), .startswith(), .replace(), and slicing reliably extracts clean JSON payloads from LLM responses.',
          expectedOutput: `Cleaned JSON String:
{"answer": "fine-tuning", "score": 0.9}
Parsed 3 JSON lines cleanly.`
        }
      },
      {
        id: '3-6-booleans-truthiness-none',
        title: 'Booleans, Truthiness & Handling NoneType',
        subtopicTag: 'Booleans & NoneType',
        conceptSummary: 'In Python, empty structures evaluate to False. Understanding truthiness simplifies guard clauses for optional API responses.',
        content: [
          'Python has explicit boolean values: `True` and `False` (capitalized).',
          'Falsy values in Python: `None`, `False`, `0`, `0.0`, `""` (empty string), `[]` (empty list), `{}` (empty dict), `()` (empty tuple), `set()`.',
          'Truthy values: Any non-zero number, non-empty string, or non-empty container.',
          '`NoneType`: Represents the intentional absence of a value. Always compare with `is None` or `is not None` rather than `== None`.'
        ],
        codeExample: {
          title: 'Guard Clauses using Truthiness & None Checks',
          code: `def process_chat_stream(token_chunk: str | None):
    # Guard against None
    if token_chunk is None:
        return "[STREAM COMPLETED]"
    
    # Guard against empty string using truthiness
    if not token_chunk.strip():
        return "[EMPTY CHUNK SKIPPED]"
        
    return f"Token: '{token_chunk}'"

print(process_chat_stream("Hello"))
print(process_chat_stream("   "))
print(process_chat_stream(None))`,
          explanation: 'Using `if not token_chunk.strip()` cleanly guards against whitespace-only tokens in streaming responses.',
          expectedOutput: `Token: 'Hello'
[EMPTY CHUNK SKIPPED]
[STREAM COMPLETED]`
        }
      }
    ],
    exercise: {
      title: 'Practice: Token Cost Formatter',
      instruction: 'Write a function format_usage(tokens: int, price_per_thousand: float) that calculates the total cost using arithmetic multiplication/division and prints: "Tokens: <tokens> | Total Cost: $<cost:.4f>".',
      starterCode: `def format_usage(tokens: int, price_per_thousand: float):
    # TODO: Calculate cost = (tokens / 1000) * price_per_thousand
    # Print formatted output with 4 decimal places
    pass

format_usage(14500, 0.002)`,
      solutionCode: `def format_usage(tokens: int, price_per_thousand: float):
    total_cost = (tokens / 1000) * price_per_thousand
    result = f"Tokens: {tokens} | Total Cost: \${total_cost:.4f}"
    print(result)
    return total_cost

format_usage(14500, 0.002)`,
      hint: 'Use the formula (tokens / 1000) * price_per_thousand and f-string format specifier :.4f.',
      testCaseDescription: 'Calculates total cost for 14500 tokens at $0.002 per 1k tokens.',
      expectedOutput: `Tokens: 14500 | Total Cost: $0.0290`
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'What is the output of `17 // 5` and `17 % 5` in Python?',
        options: [
          '3.4 and 2',
          '3 and 2',
          '3 and 0.4',
          '4 and 1'
        ],
        correctIndex: 1,
        explanation: 'Floor division (//) returns 3 (17 / 5 rounded down). Modulo (%) returns the remainder 2 (17 - 15).'
      },
      {
        id: 'q3-2',
        question: 'What does `counter += 1` do?',
        options: [
          'It creates a new counter variable in global scope',
          'It is shortcut assignment for counter = counter + 1',
          'It checks if counter is equal to 1',
          'It resets counter to 0'
        ],
        correctIndex: 1,
        explanation: '+= is the augmented assignment operator that adds the right operand to the variable and assigns the result back to it.'
      }
    ],
    flashcards: [
      {
        id: 'fc3-1',
        front: 'What does the modulo operator `%` return in Python?',
        back: 'The remainder of division. For example, `10 % 3` returns `1`.',
        aiContext: 'Used to execute tasks every Nth step, e.g. `if step % 100 == 0: log_eval()`.'
      },
      {
        id: 'fc3-2',
        front: 'What is the difference between `/` and `//` in Python?',
        back: '`/` performs standard float division (e.g. `7 / 2 = 3.5`). `//` performs floor division returning an integer (e.g. `7 // 2 = 3`).',
        aiContext: 'Floor division is essential for dataset chunking and batch calculations where index numbers must be integers.'
      }
    ],
    cheatSheet: [
      { label: 'Arithmetic operators', snippet: '+, -, *, /, //, %, **', note: 'All math operators' },
      { label: 'Shortcut addition', snippet: 'total_tokens += chunk_size', note: 'Equivalent to x = x + y' },
      { label: 'f-String format float', snippet: 'f"{num:.2f}"', note: '2 decimal places' },
      { label: 'f-String percentage', snippet: 'f"{pct:.1%}"', note: 'e.g. 95.4%' },
      { label: 'Strip whitespace', snippet: 'text.strip()', note: 'Removes edges' },
      { label: 'Join strings', snippet: '" ".join(words)', note: 'List to string' }
    ]
  },

  // ==========================================
  // MODULE 4: CONTROL FLOW & LOGIC
  // ==========================================
  {
    id: 'module-4-controlflow',
    number: 4,
    title: 'Control Flow & Logic',
    subtitle: 'Conditionals (if/elif/else), Ternary, While Loops, For Loops, Range, Enumerate, Zip, and Loop Controls (break/continue)',
    duration: '55 min',
    category: 'Core Python',
    aiRelevance: 'AI systems run iterative operations: chunking text into vectors, streaming response tokens, retrying API requests with exponential backoff, and filtering candidate completions based on confidence thresholds.',
    keyTakeaways: [
      'Write clear conditional logic with if, elif, and else chains',
      'Use Python ternary operators for concise inline assignments',
      'Implement while loops for polling asynchronous AI jobs with break, continue, and loop else',
      'Iterate over sequences efficiently with for loops and range(start, stop, step)',
      'Pair indices with values using enumerate(), and iterate multiple streams in tandem with zip()'
    ],
    sections: [
      {
        id: '4-1-comparison-and-logical',
        title: 'Comparison & Logical Operators: ==, !=, <, >, and, or, not',
        subtopicTag: 'Comparison & Logic',
        conceptSummary: 'Boolean operators evaluate conditions to True or False. Chained comparisons provide clean numerical range checking.',
        content: [
          'Comparison operators: `==` (equality), `!=` (not equal), `<` (less than), `<=` (less or equal), `>` (greater than), `>=` (greater or equal).',
          'Logical operators:',
          '• `and`: True only if BOTH operands are truthy.',
          '• `or`: True if AT LEAST ONE operand is truthy.',
          '• `not`: Inverts boolean value (`not True` is `False`).',
          'Chained comparison: Python allows `0.0 <= confidence <= 1.0` directly without writing `confidence >= 0.0 and confidence <= 1.0`.'
        ],
        codeExample: {
          title: 'Validating Model Parameters with Chained Comparisons',
          code: `def validate_generation_params(temp: float, top_p: float) -> bool:
    # Chained comparison for valid range [0.0, 1.0]
    temp_valid = (0.0 <= temp <= 2.0)
    top_p_valid = (0.0 < top_p <= 1.0)
    
    if temp_valid and top_p_valid:
        print(f"Parameters Valid -> temp: {temp}, top_p: {top_p}")
        return True
    else:
        print("Invalid generation parameters!")
        return False

validate_generation_params(0.7, 0.95)
validate_generation_params(2.5, 0.95)`,
          explanation: 'Chained comparisons streamline range checks for machine learning hyperparameters.',
          expectedOutput: `Parameters Valid -> temp: 0.7, top_p: 0.95
Invalid generation parameters!`
        }
      },
      {
        id: '4-2-conditionals-if-elif-else',
        title: 'Conditional Statements: if, elif, else & Nested Logic',
        subtopicTag: 'Conditionals (if/elif/else)',
        conceptSummary: 'Branch execution paths based on evaluated conditions. elif handles multiple mutual exclusions.',
        content: [
          'The `if` statement executes a block if its condition is True.',
          '`elif` checks an alternative condition if the preceding `if` was False.',
          '`else` executes as the final catch-all fallback if none of the preceding conditions were met.'
        ],
        codeExample: {
          title: 'Dynamic LLM Routing Based on Query Complexity',
          code: `def route_model(query: str, budget: float) -> str:
    query_length = len(query)
    
    if "code" in query.lower() or "sql" in query.lower():
        if budget >= 0.05:
            return "claude-3-7-sonnet"
        else:
            return "claude-3-5-haiku"
    elif query_length > 1000:
        return "gemini-1.5-pro"
    else:
        return "gpt-4o-mini"

print("Route 1:", route_model("Write a SQL query for customer churn", 0.10))
print("Route 2:", route_model("What is machine learning?", 0.01))`,
          explanation: 'Nested conditionals dynamically route requests based on task type and cost constraints.',
          expectedOutput: `Route 1: claude-3-7-sonnet
Route 2: gpt-4o-mini`
        }
      },
      {
        id: '4-3-ternary-operator',
        title: 'Ternary Operator (Conditional Expressions)',
        subtopicTag: 'Ternary Operator',
        conceptSummary: 'Python ternary expressions provide clean one-line value assignment: value_if_true if condition else value_if_false.',
        content: [
          'Syntax: `result = x if condition else y`.',
          'Use ternary operators for concise defaults, label formatting, or toggle flags without writing 4 lines of if/else blocks.'
        ],
        codeExample: {
          title: 'Concise Configuration Assignment with Ternary',
          code: `is_production = True

# Ternary assignment
model_endpoint = "https://api.openai.com/v1" if is_production else "http://localhost:8000"
timeout_seconds = 30 if is_production else 5

print("Endpoint:", model_endpoint)
print("Timeout:", timeout_seconds, "seconds")`,
          explanation: 'Ternary operators keep variable declarations concise and readable.',
          expectedOutput: `Endpoint: https://api.openai.com/v1
Timeout: 30 seconds`
        }
      },
      {
        id: '4-4-while-loops',
        title: 'While Loops: Conditions, Counters & Polling AI Jobs',
        subtopicTag: 'While Loops',
        conceptSummary: 'While loops run as long as a condition evaluates to True. Essential for polling asynchronous model generation jobs.',
        content: [
          'A while loop executes repeatedly while its condition remains True: `while condition:`.',
          'Counter loop: Initialize a counter (`attempt = 0`), update it in the loop (`attempt += 1`), and check the bound.',
          'Infinite loops: `while True:` runs forever until an explicit `break` is encountered.',
          'Polling AI jobs: Asynchronous jobs (video generation, batch embeddings) require polling status endpoints every N seconds until complete.'
        ],
        codeExample: {
          title: 'Asynchronous AI Job Polling Loop with While',
          code: `import time

job_states = ["QUEUED", "PROCESSING", "PROCESSING", "COMPLETED"]
poll_count = 0
max_polls = 5

while poll_count < max_polls:
    poll_count += 1
    current_status = job_states[min(poll_count - 1, len(job_states) - 1)]
    print(f"Poll #{poll_count}: Job status = {current_status}")
    
    if current_status == "COMPLETED":
        print("Asset generation finished successfully!")
        break
else:
    print("Job timed out after maximum polls.")`,
          explanation: 'The loop else clause runs only if the while condition becomes false without encountering a break statement.',
          expectedOutput: `Poll #1: Job status = QUEUED
Poll #2: Job status = PROCESSING
Poll #3: Job status = PROCESSING
Poll #4: Job status = COMPLETED
Asset generation finished successfully!`
        }
      },
      {
        id: '4-5-for-loops-and-range',
        title: 'For Loops & The range() Function',
        subtopicTag: 'For Loops & range()',
        conceptSummary: 'For loops iterate directly over sequences. range(start, stop, step) generates sequences of integers efficiently without loading full lists into memory.',
        content: [
          'Python for loops iterate directly over collections: `for item in items:`.',
          '`range(stop)`: Generates numbers from 0 up to (but not including) stop.',
          '`range(start, stop)`: Generates numbers from start to stop-1.',
          '`range(start, stop, step)`: Increments by step. Can count backwards with negative step: `range(10, 0, -1)`.'
        ],
        codeExample: {
          title: 'Iterating with For Loops and Range Step',
          code: `# Process dataset in stepped batches
total_items = 10
batch_step = 3

print("Batch Iteration Ranges:")
for start_idx in range(0, total_items, batch_step):
    end_idx = min(start_idx + batch_step, total_items)
    print(f"  Processing records {start_idx} to {end_idx}")`,
          explanation: 'range with step parameter calculates chunk boundaries cleanly for data pipelines.',
          expectedOutput: `Batch Iteration Ranges:
  Processing records 0 to 3
  Processing records 3 to 6
  Processing records 6 to 9
  Processing records 9 to 10`
        }
      },
      {
        id: '4-6-enumerate-and-zip',
        title: 'Iterating with enumerate() and zip()',
        subtopicTag: 'enumerate() & zip()',
        conceptSummary: 'enumerate() tracks the item index cleanly. zip() iterates through two or more collections simultaneously in lockstep.',
        content: [
          '`enumerate(iterable, start=0)`: Yields pairs of `(index, item)`. Eliminates manual counter variables (`i += 1`).',
          '`zip(list_a, list_b)`: Pairs corresponding elements from multiple lists into tuples: `(a[0], b[0]), (a[1], b[1])`.',
          'In AI evaluation, zip pairs candidate predictions with ground truth answers.'
        ],
        codeExample: {
          title: 'Evaluating LLM Predictions with Zip & Enumerate',
          code: `questions = ["Capital of France?", "Color of the sky?", "2 + 2?"]
answers = ["Paris", "Blue", "4"]

for idx, (q, a) in enumerate(zip(questions, answers), start=1):
    print(f"[{idx}] Q: {q:<22} | Expected A: {a}")`,
          explanation: 'Combining enumerate and zip cleanly formats multi-stream data.',
          expectedOutput: `[1] Q: Capital of France?      | Expected A: Paris
[2] Q: Color of the sky?       | Expected A: Blue
[3] Q: 2 + 2?                  | Expected A: 4`
        }
      },
      {
        id: '4-7-loop-control-break-continue-pass',
        title: 'Loop Control Statements: break, continue, pass',
        subtopicTag: 'break, continue & pass',
        conceptSummary: 'break terminates a loop immediately. continue skips to the next iteration. pass serves as a syntactic placeholder.',
        content: [
          '`break`: Immediately terminates the innermost loop.',
          '`continue`: Skips the rest of the current iteration and jumps to the next loop cycle.',
          '`pass`: Null operation; used where a statement is syntactically required but no action is needed.'
        ],
        codeExample: {
          title: 'Filtering and Early Termination in Stream Processing',
          code: `token_stream = ["Hello", "", "world", "[STOP]", "ignored", "extra"]

collected = []
for tok in token_stream:
    if not tok:
        continue     # Skip empty tokens
    if tok == "[STOP]":
        break        # Stop stream at stop token
    collected.append(tok)

print("Collected Tokens:", collected)`,
          explanation: 'continue filters out empty chunks while break immediately halts upon receiving a stop sequence from an LLM.',
          expectedOutput: `Collected Tokens: ['Hello', 'world']`
        }
      }
    ],
    exercise: {
      title: 'Practice: Filter High Confidence Predictions',
      instruction: 'Given two lists labels and confidences, use enumerate and zip to print only the labels that have confidence >= 0.85. Format: "[Index] <label> (Score: <score>)".',
      starterCode: `labels = ["Cat", "Dog", "Fox", "Wolf"]
confidences = [0.92, 0.65, 0.88, 0.40]

# TODO: Loop using enumerate(zip(labels, confidences))
# Print if confidence >= 0.85
`,
      solutionCode: `labels = ["Cat", "Dog", "Fox", "Wolf"]
confidences = [0.92, 0.65, 0.88, 0.40]

for idx, (label, score) in enumerate(zip(labels, confidences), start=1):
    if score >= 0.85:
        print(f"[{idx}] {label} (Score: {score})")`,
      hint: 'Use `if score >= 0.85:` inside `for idx, (label, score) in enumerate(zip(labels, confidences), start=1):`.',
      testCaseDescription: 'Filters out Dog (0.65) and Wolf (0.40)',
      expectedOutput: `[1] Cat (Score: 0.92)\n[3] Fox (Score: 0.88)`
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the purpose of `enumerate(my_list, start=1)`?',
        options: [
          'It reverses the list items',
          'It pairs each item in the list with an index count starting at 1',
          'It sorts the list alphabetically',
          'It filters out odd-indexed elements'
        ],
        correctIndex: 1,
        explanation: 'enumerate generates tuples of (index, item) so you do not need to manually manage an iteration counter variable.'
      },
      {
        id: 'q4-2',
        question: 'What is the difference between `break` and `continue`?',
        options: [
          'break restarts the loop from the beginning; continue exits the loop',
          'break exits the entire loop immediately; continue skips to the next iteration',
          'They perform the exact same action',
          'break only works inside functions'
        ],
        correctIndex: 1,
        explanation: 'break halts loop execution immediately, while continue skips the remaining statements in the current iteration and proceeds to the next cycle.'
      }
    ],
    flashcards: [
      {
        id: 'fc4-1',
        front: 'What does `zip(list_a, list_b)` return?',
        back: 'An iterator of tuples pairing corresponding elements from both lists: `(a[0], b[0]), (a[1], b[1])...`',
        aiContext: 'Used for matching prompt inputs with model completions and ground truth labels during evaluations.'
      },
      {
        id: 'fc4-2',
        front: 'What does `break` do inside a loop?',
        back: 'Terminates the loop immediately and resumes execution after the loop block.',
        aiContext: 'Crucial for stopping polling loops once an AI job reaches terminal state (COMPLETED or FAILED).'
      }
    ],
    cheatSheet: [
      { label: 'Ternary if-else', snippet: 'x = "a" if cond else "b"', note: 'Inline condition' },
      { label: 'Enumerate with start', snippet: 'for i, val in enumerate(arr, 1):', note: 'Index & value' },
      { label: 'Zip two lists', snippet: 'for a, b in zip(list1, list2):', note: 'Parallel loop' },
      { label: 'Range sequence', snippet: 'for i in range(0, 10, 2):', note: 'Start, stop, step' },
      { label: 'Break loop', snippet: 'if done: break', note: 'Halts loop' },
      { label: 'Continue loop', snippet: 'if empty: continue', note: 'Skips iteration' }
    ]
  },

  // ==========================================
  // MODULE 5: DATA STRUCTURES FOR AI WORKFLOWS
  // ==========================================
  {
    id: 'module-5-datastructures',
    number: 5,
    title: 'Data Structures for AI Workflows',
    subtitle: 'Lists, Slicing, List Comprehensions, Dictionaries for JSON, Dict Comprehensions, Tuples, and Sets',
    duration: '60 min',
    category: 'Data & Structures',
    aiRelevance: 'AI models exchange data as structured JSON, which translates directly to nested Python dictionaries and lists. List comprehensions transform text tokens and embeddings with high performance, and sets deduplicate retrieval chunks.',
    keyTakeaways: [
      'Master list operations, indexing, slicing, methods (.append, .extend, .pop), and list comprehensions',
      'Construct and navigate nested dictionaries mirroring OpenAI / Anthropic JSON payloads',
      'Use dictionary methods: .keys(), .values(), .items(), .get(), and dictionary comprehensions',
      'Understand tuple immutability and multi-value unpacking',
      'Leverage sets for fast deduplication, union (|), and intersection (&) in RAG pipelines'
    ],
    sections: [
      {
        id: '5-1-lists-and-methods',
        title: 'Lists: Creation, Slicing & Core Methods',
        subtopicTag: 'Lists & Methods',
        conceptSummary: 'Lists are ordered, mutable collections. Master slicing, .append(), .extend(), .pop(), and .remove().',
        content: [
          'Lists are defined with square brackets: `messages = ["hello", "world"]`. They can store heterogenous data types.',
          'Indexing & Slicing: `items[0]` (first item), `items[-1]` (last item), `items[:3]` (first 3 items).',
          '`.append(item)`: Adds a single item to the end of the list in-place.',
          '`.extend(iterable)`: Appends all items from another list in-place (unlike `append` which would add a nested list).',
          '`.pop(index)`: Removes and returns item at index (default: last item `-1`).',
          '`.remove(value)`: Removes the first matching value from the list.'
        ],
        codeExample: {
          title: 'Managing Prompt Message Lists with Core Methods',
          code: `messages = ["System: You are helpful."]
messages.append("User: What is AI?")
messages.extend(["Assistant: Artificial Intelligence.", "User: How does it work?"])

print("Current Messages Count:", len(messages))
last_msg = messages.pop()  # Removes and returns last message
print("Popped message:", last_msg)
print("Remaining messages:", len(messages))`,
          explanation: 'Lists form the backbone of conversation message stacks.',
          expectedOutput: `Current Messages Count: 4
Popped message: User: How does it work?
Remaining messages: 3`
        }
      },
      {
        id: '5-2-list-comprehensions',
        title: 'List Comprehensions: Expressive Transformations',
        subtopicTag: 'List Comprehensions',
        conceptSummary: 'List comprehensions transform and filter collections in a single expressive line: [expression for item in iterable if condition].',
        content: [
          'Standard pattern: `[expr for item in items if condition]`.',
          'They are faster than manual `.append()` loops because the iteration is optimized in C at bytecode level.',
          'Common AI uses: stripping documents, lowercasing tokens, calculating token length vectors, filtering empty completions.'
        ],
        codeExample: {
          title: 'Preprocessing Document Chunks with List Comprehensions',
          code: `raw_documents = [
    "  Intro to Neural Networks  ",
    "VECTOR DATABASES explained",
    "  ",
    "Prompt Engineering Best Practices"
]

cleaned_docs = [
    doc.strip().lower() 
    for doc in raw_documents 
    if doc.strip()
]

print("Cleaned Documents:")
for i, d in enumerate(cleaned_docs, 1):
    print(f"  {i}. {d}")`,
          explanation: 'List comprehensions transform and filter data in a single readable line.',
          expectedOutput: `Cleaned Documents:
  1. intro to neural networks
  2. vector databases explained
  3. prompt engineering best practices`
        }
      },
      {
        id: '5-3-dictionaries-and-json',
        title: 'Dictionaries: Key-Value Mapping & LLM JSON Payloads',
        subtopicTag: 'Dictionaries & Payloads',
        conceptSummary: 'Dictionaries store key-value pairs with O(1) average lookup. REST APIs and LLM message histories are modeled as nested dictionaries.',
        content: [
          'Every LLM API call uses dictionary structures: `{"role": "user", "content": "hello"}`.',
          'Essential methods: `.keys()`, `.values()`, `.items()` (returns key-value tuples for looping), `.update()`, and dictionary unpacking `{**dict1, **dict2}`.',
          'Safe access with `.get(key, default)` prevents KeyError when fields are missing.'
        ],
        codeExample: {
          title: 'Building and Inspecting OpenAI Chat Completion Payload',
          code: `def build_llm_payload(system_prompt: str, user_query: str, model="gpt-4o"):
    return {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_query}
        ],
        "temperature": 0.2,
        "max_tokens": 512
    }

payload = build_llm_payload(
    system_prompt="You are an expert SQL engineer.",
    user_query="Write a query to find top 5 active users."
)

print("Target Model:", payload["model"])
print("Number of Messages:", len(payload["messages"]))
print("System Role Message:", payload["messages"][0]["content"])`,
          explanation: 'Python dictionaries map directly to standard JSON schemas used across all frontier AI providers.',
          expectedOutput: `Target Model: gpt-4o
Number of Messages: 2
System Role Message: You are an expert SQL engineer.`
        }
      },
      {
        id: '5-4-dict-comprehensions',
        title: 'Dictionary Comprehensions & Merging ({**d1, **d2})',
        subtopicTag: 'Dict Comprehensions & Merging',
        conceptSummary: 'Transform and construct dictionaries dynamically using dict comprehensions and merge operators.',
        content: [
          'Dictionary comprehension syntax: `{key_expr: val_expr for item in iterable if condition}`.',
          'Merging dictionaries: `{**dict_a, **dict_b}` or Python 3.9+ pipe operator `dict_a | dict_b`. Right-hand keys override left-hand keys.'
        ],
        codeExample: {
          title: 'Merging Default and Override Hyperparameters',
          code: `default_params = {"model": "gpt-4o", "temperature": 0.7, "max_tokens": 1024}
user_overrides = {"temperature": 0.2, "top_p": 0.9}

# Merge with pipe operator (Python 3.9+)
final_config = default_params | user_overrides
print("Final Config (temperature overridden):")
for k, v in final_config.items():
    print(f"  • {k}: {v}")`,
          explanation: 'The merge operator overrides default configuration keys with user-supplied parameters.',
          expectedOutput: `Final Config (temperature overridden):
  • model: gpt-4o
  • temperature: 0.2
  • max_tokens: 1024
  • top_p: 0.9`
        }
      },
      {
        id: '5-5-tuples-and-unpacking',
        title: 'Tuples: Immutability, Coordinates & Unpacking',
        subtopicTag: 'Tuples & Unpacking',
        conceptSummary: 'Tuples are immutable sequences, ideal for fixed coordinates and function returns. Single-item tuples require a trailing comma.',
        content: [
          'Tuples `(x, y)` cannot be altered after creation. They are hashable, meaning they can be used as dictionary keys (unlike lists).',
          'Single-item tuple trap: `(5)` is an integer. You must write `(5,)` with a trailing comma to create a single-item tuple.',
          'Tuple unpacking: `model, temp, cost = ("gpt-4o", 0.7, 0.005)` unpacks values cleanly.'
        ],
        codeExample: {
          title: 'Tuple Return Values and Multi-Variable Unpacking',
          code: `def get_model_spec(model_id: str) -> tuple[str, int, float]:
    specs = {"gpt-4o": ("OpenAI", 128000, 2.50)}
    return specs.get(model_id, ("Unknown", 0, 0.0))

provider, context_window, price_per_m = get_model_spec("gpt-4o")
print(f"Provider: {provider}")
print(f"Context Window: {context_window:,} tokens")
print(f"Pricing: \${price_per_m} / 1M tokens")`,
          explanation: 'Returning tuples allows functions to emit multiple typed values with clean destructuring.',
          expectedOutput: `Provider: OpenAI
Context Window: 128,000 tokens
Pricing: $2.5 / 1M tokens`
        }
      },
      {
        id: '5-6-sets-and-deduplication',
        title: 'Sets: Uniqueness, Deduplication & Set Algebra (|, &, -)',
        subtopicTag: 'Sets & Deduplication',
        conceptSummary: 'Sets store unique elements with O(1) membership testing. Use set operations (union, intersection, difference) for RAG pipelines.',
        content: [
          'Sets `{1, 2, 3}` guarantee uniqueness. Duplicates are automatically removed.',
          'Set algebra: `set_a | set_b` (union), `set_a & set_b` (intersection), `set_a - set_b` (difference).',
          'Deduplication pattern: `list(set(duplicates))` removes duplicate items in one call.'
        ],
        codeExample: {
          title: 'Deduplicating Search Chunks in Hybrid RAG',
          code: `bm25_search_results = ["doc_12", "doc_45", "doc_88", "doc_12"]
vector_search_results = ["doc_45", "doc_99", "doc_101"]

set_bm25 = set(bm25_search_results)
set_vector = set(vector_search_results)

combined_all = set_bm25 | set_vector          # Union (|)
both_matched = set_bm25 & set_vector          # Intersection (&)

print("Unique BM25:", sorted(list(set_bm25)))
print("Combined Distinct (Union):", sorted(list(combined_all)))
print("Overlap Chunks (Intersection):", sorted(list(both_matched)))`,
          explanation: 'In hybrid search pipelines, sets merge and deduplicate search hits with optimal performance.',
          expectedOutput: `Unique BM25: ['doc_12', 'doc_45', 'doc_88']
Combined Distinct (Union): ['doc_12', 'doc_45', 'doc_88', 'doc_99', 'doc_101']
Overlap Chunks (Intersection): ['doc_45']`
        }
      }
    ],
    exercise: {
      title: 'Practice: Keyword Extractor with Sets & Comprehensions',
      instruction: 'Write a function extract_unique_tags(tags_list) that removes whitespace, converts each tag to lowercase, and returns a sorted list of unique tags without duplicates.',
      starterCode: `tags = [" AI ", "python", "Python", "ai", "  machine learning ", "AI"]

def extract_unique_tags(tags_list):
    # TODO: Clean whitespace, lower-case, deduplicate using set, and return sorted list
    pass

result = extract_unique_tags(tags)
print("Unique Tags:", result)`,
      solutionCode: `tags = [" AI ", "python", "Python", "ai", "  machine learning ", "AI"]

def extract_unique_tags(tags_list):
    cleaned = {t.strip().lower() for t in tags_list if t.strip()}
    return sorted(list(cleaned))

result = extract_unique_tags(tags)
print("Unique Tags:", result)`,
      hint: 'Use a set comprehension `{t.strip().lower() for t in tags_list}` and `sorted(list(...))`.',
      testCaseDescription: 'Deduplicates variations of AI and Python',
      expectedOutput: `Unique Tags: ['ai', 'machine learning', 'python']`
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'What is the primary difference between a Python List and a Python Tuple?',
        options: [
          'Lists can only hold numbers; tuples can hold any type',
          'Lists are mutable (can change length and items); tuples are immutable (read-only after creation)',
          'Tuples cannot be iterated over with for loops',
          'Lists are written with parentheses (); tuples are written with brackets []'
        ],
        correctIndex: 1,
        explanation: 'Lists are mutable [a, b, c], whereas tuples are immutable (a, b, c) and cannot be modified after assignment.'
      }
    ],
    flashcards: [
      {
        id: 'fc5-1',
        front: 'What is the time complexity of checking `item in my_set` versus `item in my_list`?',
        back: 'Set membership is O(1) on average (hash table lookup), whereas list membership is O(n) linear scan.',
        aiContext: 'Checking stopwords, blacklists, or duplicate document IDs is orders of magnitude faster with sets.'
      },
      {
        id: 'fc5-2',
        front: 'What does `my_dict.items()` return?',
        back: 'A view object yielding `(key, value)` tuples, allowing clean iteration: `for k, v in my_dict.items():`',
        aiContext: 'Used when iterating over model metadata and header configurations.'
      }
    ],
    cheatSheet: [
      { label: 'List comprehension', snippet: '[x.lower() for x in items if x]', note: 'Filter & map' },
      { label: 'Dict comprehension', snippet: '{k: v * 2 for k, v in data.items()}', note: 'Transform dict' },
      { label: 'Merge dictionaries', snippet: 'combined = {**dict_a, **dict_b}', note: 'Python 3.9+ also a | b' },
      { label: 'Set deduplication', snippet: 'unique = list(set(duplicates))', note: 'Fast distinct list' }
    ]
  },

  // ==========================================
  // MODULE 6: FUNCTIONS & CLEAN ARCHITECTURE
  // ==========================================
  {
    id: 'module-6-functions',
    number: 6,
    title: 'Functions & Clean Architecture',
    subtitle: 'Defining Functions (def), Default Parameters, *args, **kwargs, Scope (LEGB), Type Hints, and Lambdas',
    duration: '55 min',
    category: 'Core Python',
    aiRelevance: 'AI functions should be pure, predictable, and typed. Modern AI frameworks (Pydantic, LangChain, FastAPI) inspect Python type hints and docstrings to automatically generate JSON Schema definitions for LLM Tool Calling and Function Calling.',
    keyTakeaways: [
      'Define functions with def, parameters, default arguments, and return statements',
      'Avoid the mutable default argument trap by defaulting to None',
      'Use *args for variable positional arguments and **kwargs for forwarding model hyperparameters',
      'Understand Python variable scope: Local, Enclosing, Global, Built-in (LEGB rule)',
      'Leverage modern Type Hints (str, int, list[str], dict[str, Any], T | None) for LLM tool calling schemas'
    ],
    sections: [
      {
        id: '6-1-defining-functions',
        title: 'Defining Functions: def, Parameters & Return Values',
        subtopicTag: 'def, Parameters & Return',
        conceptSummary: 'Functions encapsulate reusable logic. Understand positional parameters, return statements, and implicit None returns.',
        content: [
          'Functions are declared with `def name(params):`.',
          'The `return` statement exits the function and sends a result back to the caller. A function without an explicit `return` implicitly returns `None`.',
          'Pure functions: Given the same inputs, a pure function always returns the same output without modifying global state.'
        ],
        codeExample: {
          title: 'Defining and Calling Prompt Builder Function',
          code: `def build_query(persona: str, query: str) -> str:
    cleaned = query.strip()
    return f"[{persona.upper()}] Prompt: {cleaned}"

result_1 = build_query("researcher", "  Summarize the Transformer paper  ")
result_2 = build_query("coder", "Write a FastAPI endpoint")

print(result_1)
print(result_2)`,
          explanation: 'Functions structure inputs into formatted outputs reliably across applications.',
          expectedOutput: `[RESEARCHER] Prompt: Summarize the Transformer paper
[CODER] Prompt: Write a FastAPI endpoint`
        }
      },
      {
        id: '6-2-default-parameters-trap',
        title: 'Default Parameters & The Mutable Default Argument Trap',
        subtopicTag: 'Default Parameters & Trap',
        conceptSummary: 'Default parameters provide fallbacks, but using mutable defaults ([], {}) causes shared memory corruption across calls.',
        content: [
          'Default parameters allow callers to omit arguments: `def call_llm(prompt, model="gpt-4o"):`.',
          'CRITICAL PITFALL: Never write `def func(items=[])`. Default argument expressions are evaluated ONCE at function definition time. All future calls share the same list instance!',
          'Safe idiom: Default to `None`, then initialize inside the function (`if items is None: items = []`).'
        ],
        codeExample: {
          title: 'The Mutable Default Trap vs The Safe None Idiom',
          code: `# Safe default parameter pattern
def append_chat_message(role: str, text: str, history=None):
    if history is None:
        history = []
    history.append({"role": role, "content": text})
    return history

session_1 = append_chat_message("user", "Hello AI!")
session_2 = append_chat_message("user", "Start fresh session")

print("Session 1 Length:", len(session_1))
print("Session 2 Length:", len(session_2))
print("Are they separate objects?", session_1 is not session_2)`,
          explanation: 'Defaulting to None guarantees every caller gets their own independent list instance.',
          expectedOutput: `Session 1 Length: 1
Session 2 Length: 1
Are they separate objects? True`
        }
      },
      {
        id: '6-3-args-and-kwargs',
        title: '*args and **kwargs: Forwarding Dynamic AI Hyperparameters',
        subtopicTag: '*args & **kwargs',
        conceptSummary: '*args collects positional arguments into a tuple. **kwargs collects keyword arguments into a dictionary.',
        content: [
          '`*args`: Allows a function to accept arbitrary positional arguments.',
          '`**kwargs`: Allows a function to accept arbitrary keyword arguments.',
          'In AI client wrappers, `**kwargs` passes forward optional generation settings (`temperature`, `top_p`, `seed`, `max_tokens`) to provider endpoints without modifying the wrapper signature.'
        ],
        codeExample: {
          title: 'Building a Flexible LLM Wrapper with **kwargs',
          code: `def dispatch_completion(prompt: str, model="gpt-4o", **generation_kwargs):
    print(f"Calling Model: {model}")
    print(f"Prompt: {prompt}")
    print("Forwarding Hyperparameters:")
    for param_name, param_val in generation_kwargs.items():
        print(f"  • {param_name}: {param_val}")
    return f"Response to '{prompt}'"

response = dispatch_completion(
    "Explain transformers",
    model="claude-3-5-sonnet",
    temperature=0.1,
    top_p=0.95,
    max_tokens=1000
)`,
          explanation: '**generation_kwargs gathers extra named arguments into a clean dictionary.',
          expectedOutput: `Calling Model: claude-3-5-sonnet
Prompt: Explain transformers
Forwarding Hyperparameters:
  • temperature: 0.1
  • top_p: 0.95
  • max_tokens: 1000`
        }
      },
      {
        id: '6-4-scope-legb',
        title: 'Variable Scope & The LEGB Rule',
        subtopicTag: 'Scope (LEGB Rule)',
        conceptSummary: 'Python resolves variable names using the LEGB hierarchy: Local, Enclosing, Global, Built-in.',
        content: [
          'Local (L): Variables assigned inside the current function.',
          'Enclosing (E): Variables in outer functions (closures).',
          'Global (G): Variables defined at top-level module scope.',
          'Built-in (B): Names built into Python (`len`, `range`, `print`).',
          'Modifying globals: Use the `global` keyword if you must reassign a global variable inside a function (generally discouraged; prefer passing arguments and returning values).'
        ],
        codeExample: {
          title: 'Demonstrating Local vs Global Scope',
          code: `DEFAULT_MODEL = "gpt-4o"  # Global

def run_pipeline():
    selected_model = "claude-3-5"  # Local
    print(f"Inside function: selected_model = {selected_model}")
    print(f"Inside function reading global: DEFAULT_MODEL = {DEFAULT_MODEL}")

run_pipeline()
print(f"Outside function: DEFAULT_MODEL = {DEFAULT_MODEL}")`,
          explanation: 'Local variables exist only during function execution and do not pollute global module namespace.',
          expectedOutput: `Inside function: selected_model = claude-3-5
Inside function reading global: DEFAULT_MODEL = gpt-4o
Outside function: DEFAULT_MODEL = gpt-4o`
        }
      },
      {
        id: '6-5-type-hints',
        title: 'Type Hints: The Backbone of AI Tool Calling',
        subtopicTag: 'Type Hints (typing)',
        conceptSummary: 'Type hints document expected parameter and return types. AI frameworks parse these to generate JSON schemas for LLM tool calling.',
        content: [
          'Standard built-in generics (Python 3.9+): `list[str]`, `dict[str, float]`, `tuple[int, str]`.',
          'Union syntax (Python 3.10+): `str | None` represents an optional string.',
          'Tool calling: When you pass a Python function to an LLM agent, libraries inspect your type hints to auto-generate the exact JSON Tool Definition required by the model.'
        ],
        codeExample: {
          title: 'Type-Annotated Function for Agent Tool Calling',
          code: `def get_stock_price(ticker: str, days: int = 1) -> dict[str, float | str]:
    """Retrieve historical market prices for a company stock.
    
    Args:
        ticker: The stock symbol (e.g. AAPL, NVDA).
        days: Number of past days to query.
    """
    mock_prices = {"NVDA": 135.50, "AAPL": 225.10, "MSFT": 420.00}
    price = mock_prices.get(ticker.upper(), 100.0)
    return {"ticker": ticker.upper(), "price": price, "status": "ok"}

result = get_stock_price("nvda", days=5)
print(result)`,
          explanation: 'Docstrings and explicit type annotations allow libraries like Instructor or LangChain to auto-generate the exact JSON Tool Definition required by LLMs.',
          expectedOutput: `{'ticker': 'NVDA', 'price': 135.5, 'status': 'ok'}`
        }
      },
      {
        id: '6-6-lambdas-and-first-class',
        title: 'Lambda Functions & First-Class Functions',
        subtopicTag: 'Lambdas & First-Class Functions',
        conceptSummary: 'Lambda functions are small anonymous single-expression functions: lambda x: x * 2. In Python, functions are first-class objects.',
        content: [
          'Syntax: `lambda arguments: expression`.',
          'Common uses: sorting keys in lists of dictionaries (`sorted(items, key=lambda x: x["score"], reverse=True)`).',
          'First-class functions: Functions can be stored in variables, passed as arguments to other functions, and returned from functions.'
        ],
        codeExample: {
          title: 'Sorting AI Candidate Completions by Score with Lambda',
          code: `candidates = [
    {"model": "gpt-4o", "score": 0.88},
    {"model": "claude-3-5", "score": 0.94},
    {"model": "gemini-flash", "score": 0.81}
]

# Sort candidates descending by score using a lambda key
sorted_candidates = sorted(candidates, key=lambda c: c["score"], reverse=True)

print("Ranked Candidates:")
for rank, c in enumerate(sorted_candidates, 1):
    print(f"  {rank}. {c['model']:<15} (Score: {c['score']})")`,
          explanation: 'Lambda functions provide quick inline key extractors for sorting evaluation metrics.',
          expectedOutput: `Ranked Candidates:
  1. claude-3-5       (Score: 0.94)
  2. gpt-4o           (Score: 0.88)
  3. gemini-flash     (Score: 0.81)`
        }
      }
    ],
    exercise: {
      title: 'Practice: Build a Typed Prompt Formatter',
      instruction: 'Write a function format_agent_input(user_query: str, context_chunks: list[str]) -> str that joins the context chunks with " | " and returns: "Context: <joined>\\nQuery: <query>".',
      starterCode: `def format_agent_input(user_query: str, context_chunks: list[str]) -> str:
    # TODO: Join context_chunks with " | "
    # Return formatted string
    pass

sample_context = ["Doc A: Python 3.12 is fast", "Doc B: uv is written in Rust"]
print(format_agent_input("Why use uv?", sample_context))`,
      solutionCode: `def format_agent_input(user_query: str, context_chunks: list[str]) -> str:
    joined_context = " | ".join(context_chunks)
    return f"Context: {joined_context}\\nQuery: {user_query}"

sample_context = ["Doc A: Python 3.12 is fast", "Doc B: uv is written in Rust"]
print(format_agent_input("Why use uv?", sample_context))`,
      hint: 'Use `" | ".join(context_chunks)` and an f-string.',
      testCaseDescription: 'Combines multiple context strings with user query.',
      expectedOutput: `Context: Doc A: Python 3.12 is fast | Doc B: uv is written in Rust\nQuery: Why use uv?`
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'Why is `def func(items=[])` considered dangerous in Python?',
        options: [
          'Python does not allow square brackets in function signatures',
          'The default empty list is instantiated once at function definition time and shared across all future calls, accumulating mutations',
          'It forces the function to return a tuple instead of a list',
          'It causes a SyntaxError on Python 3.12'
        ],
        correctIndex: 1,
        explanation: 'Default argument expressions are evaluated once when the function is defined. If the default is mutable, all calls that rely on the default share that single list instance.'
      }
    ],
    flashcards: [
      {
        id: 'fc6-1',
        front: 'What does `**kwargs` do in a function definition?',
        back: 'Captures any excess keyword arguments passed to the function into a dictionary.',
        aiContext: 'Allows helper functions to accept and forward arbitrary LLM settings like temperature, top_p, and frequency_penalty.'
      },
      {
        id: 'fc6-2',
        front: 'How do you type-hint an optional string in Python 3.10+?',
        back: '`str | None` (or `Optional[str]` from typing).',
        aiContext: 'Used for optional system prompts, user IDs, and metadata tags in AI pipelines.'
      }
    ],
    cheatSheet: [
      { label: 'Type Hint syntax', snippet: 'def fn(x: str) -> bool:', note: 'Parameter & return types' },
      { label: 'Optional parameter', snippet: 'val: str | None = None', note: 'Can be str or None' },
      { label: 'Arbitrary kwargs', snippet: 'def run(**kwargs):', note: 'Captures named args' },
      { label: 'Safe default pattern', snippet: 'if arg is None: arg = []', note: 'Avoids shared list bug' }
    ]
  },

  // ==========================================
  // MODULE 7: OBJECT-ORIENTED PROGRAMMING (OOP)
  // ==========================================
  {
    id: 'module-7-oop',
    number: 7,
    title: 'Object-Oriented Programming (OOP) & Dataclasses',
    subtitle: 'Classes, Objects, __init__, self, Encapsulation, State Management, and Dataclasses',
    duration: '55 min',
    category: 'AI Engineering',
    aiRelevance: 'AI agents, vector store connectors, and conversational memory are modeled as stateful classes. Python @dataclass provides structured records for chat messages and model responses with zero boilerplate.',
    keyTakeaways: [
      'Understand classes as blueprints and objects as stateful instances',
      'Master the __init__ constructor, instance attributes, and self parameter',
      'Build encapsulation: methods that manage internal state (e.g. ChatMemory)',
      'Use the @dataclass decorator from the standard library to eliminate boilerplate',
      'Design clean AI agent classes that track conversation turns and API client states'
    ],
    sections: [
      {
        id: '7-1-classes-and-init',
        title: 'Classes, Self & The __init__ Constructor',
        subtopicTag: 'Classes, Objects & __init__',
        conceptSummary: 'Classes group data (attributes) and behavior (methods) together into a reusable object blueprint. self refers to the specific instance being operated on.',
        content: [
          'A class is defined with `class Agent:` (PascalCase naming).',
          '`__init__(self, ...)` is the initializer method automatically invoked when a new object is created: `agent = Agent("gpt-4o")`.',
          '`self` represents the instance itself, allowing each object to maintain its own separate attributes and memory.'
        ],
        codeExample: {
          title: 'Building a Stateful ChatMemory Class',
          code: `class ConversationMemory:
    """Manages chat message history for an LLM session."""
    def __init__(self, system_role: str):
        self.system_role = system_role
        self.messages: list[dict[str, str]] = [
            {"role": "system", "content": system_role}
        ]
        
    def add_user_message(self, content: str) -> None:
        self.messages.append({"role": "user", "content": content})
        
    def add_assistant_message(self, content: str) -> None:
        self.messages.append({"role": "assistant", "content": content})
        
    def get_token_count_estimate(self) -> int:
        total_chars = sum(len(m["content"]) for m in self.messages)
        return total_chars // 4

memory = ConversationMemory("You are a helpful coding tutor.")
memory.add_user_message("What is a class?")
memory.add_assistant_message("A class is a blueprint for objects.")

print("Total messages in history:", len(memory.messages))
print("Estimated prompt tokens:", memory.get_token_count_estimate())`,
          explanation: 'ConversationMemory encapsulates both the data structure (messages list) and logic (token counting and message appending) into a clean, reusable interface.',
          expectedOutput: `Total messages in history: 3
Estimated prompt tokens: 23`
        }
      },
      {
        id: '7-2-str-and-repr',
        title: 'String Representations: __str__ vs __repr__',
        subtopicTag: '__str__ & __repr__',
        conceptSummary: '__str__ provides human-readable output for users; __repr__ provides unambiguous debugging information for developers.',
        content: [
          '`__str__`: Invoked by `print(obj)` and `str(obj)` for friendly end-user display.',
          '`__repr__`: Invoked when inspecting an object in the REPL or interactive console. Should ideally resemble executable code: `ModelConfig(name="gpt-4o")`.'
        ],
        codeExample: {
          title: 'Implementing __str__ and __repr__ for an AI Model Config',
          code: `class ModelSpec:
    def __init__(self, name: str, max_tokens: int):
        self.name = name
        self.max_tokens = max_tokens
        
    def __repr__(self) -> str:
        return f"ModelSpec(name={self.name!r}, max_tokens={self.max_tokens})"
        
    def __str__(self) -> str:
        return f"AI Model '{self.name}' (Context: {self.max_tokens} tokens)"

spec = ModelSpec("claude-3-7-sonnet", 200000)
print("repr():", repr(spec))
print("str(): ", str(spec))`,
          explanation: 'Implementing __repr__ makes debugging and logging object states straightforward.',
          expectedOutput: `repr(): ModelSpec(name='claude-3-7-sonnet', max_tokens=200000)
str():  AI Model 'claude-3-7-sonnet' (Context: 200000 tokens)`
        }
      },
      {
        id: '7-3-dataclasses',
        title: 'Python Dataclasses: Clean Structured Data for AI',
        subtopicTag: '@dataclass Decorator',
        conceptSummary: 'The @dataclass decorator automatically generates __init__, __repr__, and __eq__ methods for data-holding classes without manual boilerplate.',
        content: [
          'In AI pipelines, many classes exist solely to hold structured data (e.g., embedding chunks, evaluation scores, API usage logs).',
          'Importing `@dataclass` from `dataclasses` removes tedious manual `__init__` declarations.',
          'Dataclasses support default values, type hints, and can be easily converted to dictionaries using `asdict(obj)`.'
        ],
        codeExample: {
          title: 'Defining AI Model Generation Records with @dataclass',
          code: `from dataclasses import dataclass, asdict

@dataclass
class ModelGeneration:
    model: str
    prompt: str
    completion: str
    prompt_tokens: int
    completion_tokens: int
    finish_reason: str = "stop"

    @property
    def total_tokens(self) -> int:
        return self.prompt_tokens + self.completion_tokens

record = ModelGeneration(
    model="gpt-4o",
    prompt="Explain quantum computing",
    completion="Quantum computing uses qubits...",
    prompt_tokens=15,
    completion_tokens=85
)

print("Record:", record)
print("Total Tokens:", record.total_tokens)
print("As Dictionary:", asdict(record)["finish_reason"])`,
          explanation: '@dataclass automatically prints a readable __repr__ string and enables property getters for derived calculations like total_tokens.',
          expectedOutput: `Record: ModelGeneration(model='gpt-4o', prompt='Explain quantum computing', completion='Quantum computing uses qubits...', prompt_tokens=15, completion_tokens=85, finish_reason='stop')
Total Tokens: 100
As Dictionary: stop`
        }
      }
    ],
    exercise: {
      title: 'Practice: Build a DocumentChunk Dataclass',
      instruction: 'Create a dataclass DocumentChunk with fields: chunk_id: str, text: str, and score: float = 0.0. Instantiate one and print: "Chunk <chunk_id>: <score>".',
      starterCode: `from dataclasses import dataclass

# TODO: Define DocumentChunk dataclass
# Instantiate with chunk_id="doc-1", text="Sample text", score=0.91
# Print formatted output
`,
      solutionCode: `from dataclasses import dataclass

@dataclass
class DocumentChunk:
    chunk_id: str
    text: str
    score: float = 0.0

chunk = DocumentChunk(chunk_id="doc-1", text="Sample text", score=0.91)
print(f"Chunk {chunk.chunk_id}: {chunk.score}")`,
      hint: 'Decorate the class with `@dataclass` and specify field types.',
      testCaseDescription: 'Creates DocumentChunk object and reads fields.',
      expectedOutput: `Chunk doc-1: 0.91`
    },
    quiz: [
      {
        id: 'q7-1',
        question: 'What does the `@dataclass` decorator automatically generate for your class?',
        options: [
          'An active SQL database connection',
          'Standard methods like `__init__`, `__repr__`, and `__eq__` based on typed attributes',
          'Automatic translation to JavaScript',
          'Machine learning gradient calculations'
        ],
        correctIndex: 1,
        explanation: '@dataclass analyzes typed attributes and generates the constructor, string representation, and comparison methods automatically.'
      }
    ],
    flashcards: [
      {
        id: 'fc7-1',
        front: 'What does `self` represent in a Python class method?',
        back: 'The specific instance of the class that is invoking the method, allowing access to its unique attributes.',
        aiContext: 'Allows agent instances to maintain their own isolated conversation history and API sessions.'
      },
      {
        id: 'fc7-2',
        front: 'How do you convert a `@dataclass` instance into a Python dictionary?',
        back: 'Using `from dataclasses import asdict; asdict(my_instance)`',
        aiContext: 'Useful for serializing dataclass instances into JSON payloads for API responses or database writes.'
      }
    ],
    cheatSheet: [
      { label: 'Define Class', snippet: 'class Agent:\n  def __init__(self, m):\n    self.m = m', note: 'Standard constructor' },
      { label: 'Dataclass syntax', snippet: '@dataclass\nclass Item:\n  name: str\n  val: int = 0', note: 'No boilerplate init' },
      { label: 'Instance Property', snippet: '@property\ndef total(self): return self.a + self.b', note: 'Computed attribute' },
      { label: 'Convert dataclass to dict', snippet: 'asdict(obj)', note: 'From dataclasses import asdict' }
    ]
  },

  // ==========================================
  // MODULE 8: ROBUST ERROR HANDLING
  // ==========================================
  {
    id: 'module-8-errorhandling',
    number: 8,
    title: 'Robust Error Handling & Defensive Coding',
    subtitle: 'Try/Except/Else/Finally, Specific Exceptions, Raising Exceptions (raise), and API Retry Loops with Backoff',
    duration: '50 min',
    category: 'AI Engineering',
    aiRelevance: 'AI APIs are distributed cloud services subject to network latency, rate limits (HTTP 429), server timeouts, and schema hallucinations. Production AI software must fail gracefully and implement exponential backoff retries.',
    keyTakeaways: [
      'Master the try, except, else, and finally execution flow',
      'Catch specific exception types (KeyError, TypeError, ValueError) rather than bare excepts',
      'Raise descriptive custom exceptions with raise',
      'Implement retry loops with exponential backoff for rate-limited AI endpoints',
      'Log and diagnose failures without crashing production web services'
    ],
    sections: [
      {
        id: '8-1-try-except-blocks',
        title: 'The Try / Except / Else / Finally Pattern',
        subtopicTag: 'try/except/else/finally',
        conceptSummary: 'Exception handling allows programs to intercept runtime errors, run recovery logic, and guarantee resource cleanup.',
        content: [
          '`try`: Wraps code that might raise an exception.',
          '`except SpecificError as e`: Runs only if that specific error occurs. Never use bare `except:` as it catches KeyboardInterrupt and system exits.',
          '`else`: Runs only if the `try` block succeeded with NO exceptions.',
          '`finally`: Guaranteed to execute regardless of whether an exception occurred or was caught (ideal for closing file handles or database connections).'
        ],
        codeExample: {
          title: 'Safe JSON Parsing with Specific Exception Handling',
          code: `import json

def parse_llm_json(raw_text: str) -> dict:
    try:
        data = json.loads(raw_text)
    except json.JSONDecodeError as err:
        print(f"JSON Syntax error detected at line {err.lineno}: {err.msg}")
        return {"error": "invalid_json", "raw": raw_text}
    except TypeError as err:
        print("Expected string, but received wrong data type:", err)
        return {"error": "type_mismatch"}
    else:
        print("JSON parsed successfully!")
        return data
    finally:
        print("[Parse attempt completed]")

valid_result = parse_llm_json('{"status": "ok", "tokens": 42}')
invalid_result = parse_llm_json('{broken json: missing quotes}')`,
          explanation: 'Targeting json.JSONDecodeError allows you to pinpoint syntax failures in LLM outputs and return structured fallback dictionaries.',
          expectedOutput: `JSON parsed successfully!
[Parse attempt completed]
JSON Syntax error detected at line 1: Expecting property name enclosed in double quotes
[Parse attempt completed]`
        }
      },
      {
        id: '8-2-raising-exceptions',
        title: 'Raising Exceptions & Custom Exception Classes',
        subtopicTag: 'Raising Custom Exceptions',
        conceptSummary: 'Use raise to trigger exceptions when invariants are violated. Create custom exception classes by inheriting from Exception.',
        content: [
          'Trigger exceptions with `raise ValueError("Message")`.',
          'Define domain-specific exceptions: `class RateLimitExceeded(Exception): pass`. This allows callers to catch your specific error cleanly.'
        ],
        codeExample: {
          title: 'Defining and Raising a Custom AI Exception',
          code: `class ContextWindowExceeded(Exception):
    """Raised when total tokens exceed model maximum window."""
    def __init__(self, token_count: int, max_limit: int):
        super().__init__(f"Prompt tokens ({token_count}) exceed model limit ({max_limit})")
        self.token_count = token_count
        self.max_limit = max_limit

def check_prompt_budget(text: str, limit: int = 100):
    estimated = len(text.split())
    if estimated > limit:
        raise ContextWindowExceeded(estimated, limit)
    return True

try:
    check_prompt_budget("word " * 150, limit=100)
except ContextWindowExceeded as e:
    print("Caught custom exception:", e)
    print("Tokens overage:", e.token_count - e.max_limit)`,
          explanation: 'Custom exceptions provide structured attributes for error handling in agent pipelines.',
          expectedOutput: `Caught custom exception: Prompt tokens (150) exceed model limit (100)
Tokens overage: 50`
        }
      },
      {
        id: '8-3-retry-logic-backoff',
        title: 'Building Resilient Retry Loops with Exponential Backoff',
        subtopicTag: 'Retry & Backoff (HTTP 429)',
        conceptSummary: 'When an AI API responds with HTTP 429 (Too Many Requests), retrying immediately makes rate-limiting worse. Exponential backoff progressively increases wait times.',
        content: [
          'Exponential backoff formula: wait = base * 2^(attempt - 1). For example: 0.1s, 0.2s, 0.4s, 0.8s.',
          'Always cap maximum retry attempts (e.g. 3 to 5 attempts) to prevent infinite loops.'
        ],
        codeExample: {
          title: 'Simulating Exponential Backoff Retry Loop',
          code: `import time

class RateLimitError(Exception):
    pass

def mock_flaky_api_call(attempt: int):
    if attempt < 3:
        raise RateLimitError("Rate limit exceeded: 429")
    return {"status": "success", "result": "Model output generated"}

def call_with_retry(max_retries=4, base_delay=0.1):
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Attempt #{attempt}: Calling AI endpoint...")
            return mock_flaky_api_call(attempt)
        except RateLimitError as e:
            delay = base_delay * (2 ** (attempt - 1))
            print(f"  Warning: {e}. Backing off for {delay:.2f}s...")
            time.sleep(delay)
    raise RuntimeError("Failed after max retries")

response = call_with_retry()
print("Final Outcome:", response)`,
          explanation: 'The retry pattern catches transient RateLimitErrors and retries with progressive delay intervals until success.',
          expectedOutput: `Attempt #1: Calling AI endpoint...
  Warning: Rate limit exceeded: 429. Backing off for 0.10s...
Attempt #2: Calling AI endpoint...
  Warning: Rate limit exceeded: 429. Backing off for 0.20s...
Attempt #3: Calling AI endpoint...
Final Outcome: {'status': 'success', 'result': 'Model output generated'}`
        }
      }
    ],
    exercise: {
      title: 'Practice: Safe Number Parser with Fallback',
      instruction: 'Write a function safe_parse_float(val: str, fallback: float = 0.0) -> float that uses try/except ValueError to parse a string to a float, returning fallback if parsing fails.',
      starterCode: `def safe_parse_float(val: str, fallback: float = 0.0) -> float:
    # TODO: try to return float(val), except ValueError return fallback
    pass

print(safe_parse_float("0.85"))
print(safe_parse_float("N/A", fallback=0.5))`,
      solutionCode: `def safe_parse_float(val: str, fallback: float = 0.0) -> float:
    try:
        return float(val)
    except ValueError:
        return fallback

print(safe_parse_float("0.85"))
print(safe_parse_float("N/A", fallback=0.5))`,
      hint: 'Use `try: return float(val)` and `except ValueError: return fallback`.',
      testCaseDescription: 'Parses valid float and catches invalid strings safely.',
      expectedOutput: `0.85\n0.5`
    },
    quiz: [
      {
        id: 'q8-1',
        question: 'When does the `else` block execute in a try/except/else/finally construct?',
        options: [
          'Only when an exception IS raised and caught',
          'Only when the try block completes successfully WITHOUT any exceptions',
          'Every time regardless of what happens',
          'Only if the finally block fails'
        ],
        correctIndex: 1,
        explanation: 'The `else` block runs strictly when no exceptions were encountered in the `try` block.'
      }
    ],
    flashcards: [
      {
        id: 'fc8-1',
        front: 'Why should you avoid using a bare `except:` clause?',
        back: 'A bare except catches everything, including KeyboardInterrupt (Ctrl+C) and SystemExit, making it impossible to stop or debug scripts cleanly.',
        aiContext: 'Always catch specific exceptions like ValueError, KeyError, or APIConnectionError.'
      },
      {
        id: 'fc8-2',
        front: 'What is exponential backoff?',
        back: 'An error handling strategy where wait time between retries doubles exponentially (1s, 2s, 4s...) to avoid overwhelming rate-limited services.',
        aiContext: 'Standard best practice when handling HTTP 429 errors from LLM providers.'
      }
    ],
    cheatSheet: [
      { label: 'Try Except block', snippet: 'try:\n  ...\nexcept KeyError as e:\n  ...', note: 'Catch specific error' },
      { label: 'Try Else block', snippet: 'else:\n  print("Success")', note: 'Runs if no errors' },
      { label: 'Finally block', snippet: 'finally:\n  cleanup()', note: 'Always runs' },
      { label: 'Raise exception', snippet: 'raise ValueError("Invalid tokens")', note: 'Trigger error' }
    ]
  },

  // ==========================================
  // MODULE 9: WORKING WITH DATA & PANDAS
  // ==========================================
  {
    id: 'module-9-data-pandas',
    number: 9,
    title: 'Working with Data: Files, JSON & Pandas',
    subtitle: 'Context Managers (with open), JSON Serialization, CSV Processing, and Pandas Basics',
    duration: '55 min',
    category: 'Data & Structures',
    aiRelevance: 'AI models live on data. Ingesting customer documents, parsing JSON schemas, analyzing prompt evaluation benchmarks, and filtering training datasets in Pandas are fundamental day-to-day tasks.',
    keyTakeaways: [
      'Use context managers (with open(...) as f) to guarantee safe file I/O across modes (r, w, a)',
      'Serialize and deserialize JSON with json.loads() and json.dumps()',
      'Read and write CSV tabular data using csv and Pandas',
      'Understand Pandas Series and DataFrame structures for dataset inspection and filtering',
      'Aggregate AI evaluation scores across benchmark datasets'
    ],
    sections: [
      {
        id: '9-1-file-io',
        title: 'File I/O & Context Managers (with open)',
        subtopicTag: 'File Handling & with open',
        conceptSummary: 'Context managers guarantee file handles are closed even if errors occur. Master read, write, and append modes.',
        content: [
          'Modes: `"r"` (read), `"w"` (write / overwrite), `"a"` (append).',
          'Always use `with open("file.txt", "r") as f:`. This ensures the file descriptor is closed automatically upon exiting the block.',
          'Reading methods: `.read()` (entire file into string), `.readline()` (single line), `.readlines()` (list of lines).'
        ],
        codeExample: {
          title: 'Simulating Safe File Reading and Appending',
          code: `# Simulated file logging demonstration
log_entries = [
    "2026-10-09 12:00:00 - User query: Summarize doc",
    "2026-10-09 12:00:02 - Model generated 180 tokens",
    "2026-10-09 12:00:03 - Status: 200 OK"
]

print("Simulating Context Manager File Write & Read:")
print(f"Total lines processed: {len(log_entries)}")
for line in log_entries:
    print(f"  [LOG ENTRY] {line}")`,
          explanation: 'Context managers guarantee file handles are properly cleaned up without memory leaks.',
          expectedOutput: `Simulating Context Manager File Write & Read:
Total lines processed: 3
  [LOG ENTRY] 2026-10-09 12:00:00 - User query: Summarize doc
  [LOG ENTRY] 2026-10-09 12:00:02 - Model generated 180 tokens
  [LOG ENTRY] 2026-10-09 12:00:03 - Status: 200 OK`
        }
      },
      {
        id: '9-2-json-serialization',
        title: 'JSON Serialization: json.loads() & json.dumps()',
        subtopicTag: 'JSON Parsing & Serialization',
        conceptSummary: 'JSON is the standard data interchange format for AI. json.loads parses strings into dicts; json.dumps serializes dicts into strings.',
        content: [
          '`json.loads(string)`: Deserializes JSON string into a Python dict or list.',
          '`json.dumps(obj, indent=2)`: Serializes Python dict into a formatted JSON string.',
          '`json.load(file)` and `json.dump(obj, file)` operate directly on open file handles.'
        ],
        codeExample: {
          title: 'Serializing & Deserializing Agent Configurations',
          code: `import json

agent_config = {
    "agent_name": "ResearchBot",
    "version": "1.0.0",
    "tools": ["web_search", "calculator"],
    "model_settings": {
        "temperature": 0.2,
        "max_tokens": 1024
    }
}

json_string = json.dumps(agent_config, indent=2)
print("Serialized JSON (First 80 chars):")
print(json_string[:80] + "...")

parsed_dict = json.loads(json_string)
print("Extracted Agent Name:", parsed_dict["agent_name"])
print("Configured Tools Count:", len(parsed_dict["tools"]))`,
          explanation: 'json.dumps and json.loads convert between Python runtime memory objects and persistent text schemas.',
          expectedOutput: `Serialized JSON (First 80 chars):
{
  "agent_name": "ResearchBot",
  "version": "1.0.0",
  "tools": [
    "web_search",...
Extracted Agent Name: ResearchBot
Configured Tools Count: 2`
        }
      },
      {
        id: '9-3-pandas-dataframes',
        title: 'Pandas Fundamentals for AI Evaluation & Datasets',
        subtopicTag: 'Pandas DataFrames',
        conceptSummary: 'Pandas provides fast tabular data structures (DataFrames). Standard for analyzing model benchmarks, token costs, and user prompt logs.',
        content: [
          'A `DataFrame` is a 2-dimensional labeled data structure with columns of potentially different types.',
          'Read CSVs with `df = pd.read_csv("evals.csv")`. Inspect rows with `df.head()` and `df.describe()`.',
          'Filtering: `high_quality = df[df["score"] >= 0.90]`.',
          'Grouping & aggregating: `df.groupby("model")["latency_ms"].mean()` compares performance across LLM providers.'
        ],
        codeExample: {
          title: 'Simulating LLM Benchmark Comparison with Tabular Data',
          code: `evaluation_runs = [
    {"model": "gpt-4o", "accuracy": 0.88, "latency_ms": 450, "cost": 0.005},
    {"model": "gpt-4o", "accuracy": 0.91, "latency_ms": 420, "cost": 0.005},
    {"model": "claude-3-5", "accuracy": 0.93, "latency_ms": 520, "cost": 0.006},
    {"model": "gemini-flash", "accuracy": 0.84, "latency_ms": 180, "cost": 0.001},
]

models = set(r["model"] for r in evaluation_runs)
print(f"{'Model':<15} | {'Avg Accuracy':<12} | {'Avg Latency (ms)':<16}")
print("-" * 50)

for m in sorted(models):
    m_runs = [r for r in evaluation_runs if r["model"] == m]
    avg_acc = sum(r["accuracy"] for r in m_runs) / len(m_runs)
    avg_lat = sum(r["latency_ms"] for r in m_runs) / len(m_runs)
    print(f"{m:<15} | {avg_acc:.2%}       | {avg_lat:.0f} ms")`,
          explanation: 'Aggregating benchmark logs evaluates cost-to-performance tradeoffs when choosing models for production.',
          expectedOutput: `Model           | Avg Accuracy | Avg Latency (ms)
--------------------------------------------------
claude-3-5      | 93.00%       | 520 ms
gemini-flash    | 84.00%       | 180 ms
gpt-4o          | 89.50%       | 435 ms`
        }
      }
    ],
    exercise: {
      title: 'Practice: Benchmark Score Filter',
      instruction: 'Given a list of model logs [{"run": 1, "score": 0.95}, {"run": 2, "score": 0.70}, {"run": 3, "score": 0.88}], print only the runs where score is >= 0.85. Format: "Run <run>: <score>".',
      starterCode: `runs = [
    {"run": 1, "score": 0.95},
    {"run": 2, "score": 0.70},
    {"run": 3, "score": 0.88}
]

# TODO: Filter and print runs with score >= 0.85
`,
      solutionCode: `runs = [
    {"run": 1, "score": 0.95},
    {"run": 2, "score": 0.70},
    {"run": 3, "score": 0.88}
]

for item in runs:
    if item["score"] >= 0.85:
        print(f"Run {item['run']}: {item['score']}")`,
      hint: 'Loop through `runs` and check `if item["score"] >= 0.85:`.',
      testCaseDescription: 'Prints only run 1 and run 3',
      expectedOutput: `Run 1: 0.95\nRun 3: 0.88`
    },
    quiz: [
      {
        id: 'q9-1',
        question: 'What is the primary benefit of the `with open(...) as f:` syntax in Python?',
        options: [
          'It automatically converts plain text files into binary files',
          'It guarantees the file stream is properly closed upon block exit, preventing file handle leaks',
          'It loads the entire file into a GPU tensor',
          'It encrypts the file automatically'
        ],
        correctIndex: 1,
        explanation: 'The context manager calls f.close() automatically, even if exceptions are raised inside the block.'
      }
    ],
    flashcards: [
      {
        id: 'fc9-1',
        front: 'What is the difference between `json.loads` and `json.dumps`?',
        back: '`json.loads` parses a string into a Python dict (Load String). `json.dumps` serializes a Python dict into a JSON string (Dump String).',
        aiContext: 'Used constantly when parsing API HTTP responses and preparing JSON request payloads.'
      },
      {
        id: 'fc9-2',
        front: 'What is a Pandas DataFrame?',
        back: 'A 2-dimensional labeled data structure with columns of potentially different types, resembling a table or spreadsheet.',
        aiContext: 'The standard tool for analyzing dataset distributions and AI evaluation benchmark scores.'
      }
    ],
    cheatSheet: [
      { label: 'Safe File Open', snippet: 'with open("file.txt", "r") as f:\n  data = f.read()', note: 'Context manager' },
      { label: 'JSON string to dict', snippet: 'data = json.loads(json_str)', note: 'Deserialize' },
      { label: 'Dict to JSON string', snippet: 'json_str = json.dumps(data, indent=2)', note: 'Serialize' },
      { label: 'Pandas Read CSV', snippet: 'df = pd.read_csv("data.csv")', note: 'Load dataset' }
    ]
  },

  // ==========================================
  // MODULE 10: WORKING WITH REST APIS & REQUESTS
  // ==========================================
  {
    id: 'module-10-apis-requests',
    number: 10,
    title: 'Working with REST APIs & HTTP Requests',
    subtitle: 'HTTP Verbs (GET/POST), Status Codes, Bearer Headers, and .env Secrets with Requests',
    duration: '50 min',
    category: 'AI Engineering',
    aiRelevance: 'Frontier AI models are hosted as REST APIs. Understanding HTTP requests, authorization headers (Bearer tokens), query parameters, and payload serialization lets you connect to any AI endpoint without relying on third-party wrapper SDKs.',
    imageVisual: '/src/assets/images/illustration_llm_pipeline_1791573011970.jpg',
    keyTakeaways: [
      'Understand HTTP verbs: GET (read), POST (generate/create), and status codes (200, 401, 429)',
      'Manage API keys securely using python-dotenv and environment variables (.env)',
      'Send authenticated POST requests with custom headers: {"Authorization": "Bearer KEY"}',
      'Parse JSON responses and handle HTTP connection errors with raise_for_status()',
      'Build a standalone API client for LLM completions in pure Python'
    ],
    sections: [
      {
        id: '10-1-http-and-requests',
        title: 'HTTP Fundamentals & The Requests Library',
        subtopicTag: 'HTTP Verbs & Status Codes',
        conceptSummary: 'Client-server communication follows the HTTP protocol. Python requests provides a friendly interface for sending headers, JSON payloads, and reading status codes.',
        content: [
          'HTTP methods: AI inference endpoints almost always use `POST`, because generation requires sending structured configuration bodies and message arrays.',
          'Status codes to recognize:',
          '• 200 OK: Request succeeded, response body contains completion.',
          '• 400 Bad Request: Invalid parameter name or malformed JSON.',
          '• 401 Unauthorized: Missing or incorrect API key.',
          '• 429 Too Many Requests: Rate limit or quota exhausted.',
          '• 500 / 503 Internal Server Error: Provider downtime or GPU cluster error.'
        ],
        codeExample: {
          title: 'Structure of an Authenticated LLM REST Request',
          code: `import json

api_url = "https://api.openai.com/v1/chat/completions"
api_key = "sk-proj-demo-mock-key-12345"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

body = {
    "model": "gpt-4o",
    "messages": [
        {"role": "user", "content": "Explain vector embeddings in 1 sentence."}
    ],
    "temperature": 0.3
}

print(f"Target URL: {api_url}")
print(f"Authorization Header: Bearer sk-proj-...{api_key[-5:]}")
print("Serialized Payload Size:", len(json.dumps(body)), "bytes")`,
          explanation: 'Every high-level SDK compiles these headers and JSON payloads under the hood.',
          expectedOutput: `Target URL: https://api.openai.com/v1/chat/completions
Authorization Header: Bearer sk-proj-...12345
Serialized Payload Size: 139 bytes`
        }
      },
      {
        id: '10-2-env-secrets',
        title: 'Managing Secrets Safely with python-dotenv',
        subtopicTag: 'Secrets & .env Files',
        conceptSummary: 'Hardcoding API keys in source code leads to catastrophic credential leaks. Environment variables keep secrets out of git repositories.',
        content: [
          'Create a `.env` file in your project root containing: `OPENAI_API_KEY="sk-..."`.',
          'Add `.env` to your `.gitignore` immediately.',
          'Commit a `.env.example` file that shows variable names with empty values to guide colleagues.',
          'In Python, use `from dotenv import load_dotenv; load_dotenv()` and read keys via `os.getenv("OPENAI_API_KEY")`.'
        ],
        codeExample: {
          title: 'Secure Environment Variable Retrieval with Validation',
          code: `import os

def get_verified_api_key(var_name: str) -> str:
    key = os.getenv(var_name)
    if not key:
        raise ValueError(
            f"Missing required environment variable '{var_name}'. "
            f"Please verify your .env file is configured."
        )
    return key

os.environ["MOCK_AI_KEY"] = "sk-mock-production-key-998877"
retrieved_key = get_verified_api_key("MOCK_AI_KEY")
print("Retrieved API Key Masked:", retrieved_key[:7] + "..." + retrieved_key[-4:])`,
          explanation: 'Validating environment variables at startup prevents subtle downstream failures during live requests.',
          expectedOutput: `Retrieved API Key Masked: sk-mock...8877`
        }
      }
    ],
    exercise: {
      title: 'Practice: Build an HTTP Header Generator',
      instruction: 'Write a function build_auth_headers(api_key: str, organization_id: str | None = None) -> dict that returns a headers dict with "Authorization": "Bearer <key>" and "Content-Type": "application/json". If organization_id is provided, also include "OpenAI-Organization": <id>.',
      starterCode: `def build_auth_headers(api_key: str, organization_id: str | None = None) -> dict:
    # TODO: Build and return headers dictionary
    pass

print(build_auth_headers("sk-test-123", organization_id="org-ai-lab"))`,
      solutionCode: `def build_auth_headers(api_key: str, organization_id: str | None = None) -> dict:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    if organization_id:
        headers["OpenAI-Organization"] = organization_id
    return headers

print(build_auth_headers("sk-test-123", organization_id="org-ai-lab"))`,
      hint: 'Initialize the base headers dict, check `if organization_id:`, and add the extra key.',
      testCaseDescription: 'Includes bearer token and optional org header.',
      expectedOutput: `{'Authorization': 'Bearer sk-test-123', 'Content-Type': 'application/json', 'OpenAI-Organization': 'org-ai-lab'}`
    },
    quiz: [
      {
        id: 'q10-1',
        question: 'What HTTP status code indicates that you have hit an AI model rate limit or quota ceiling?',
        options: [
          '200 OK',
          '404 Not Found',
          '429 Too Many Requests',
          '301 Moved Permanently'
        ],
        correctIndex: 2,
        explanation: 'HTTP 429 Too Many Requests is the standard status code indicating that request volume or token quota has been exceeded.'
      }
    ],
    flashcards: [
      {
        id: 'fc10-1',
        front: 'What header format is used for API token authorization?',
        back: '`"Authorization": f"Bearer {api_key}"`',
        aiContext: 'Standard authentication protocol used by OpenAI, Anthropic, Hugging Face, and Groq.'
      },
      {
        id: 'fc10-2',
        front: 'How do you load environment variables from a `.env` file in Python?',
        back: '`from dotenv import load_dotenv; load_dotenv()` followed by `os.getenv("KEY_NAME")`',
        aiContext: 'Prevents accidentally leaking confidential LLM credentials into version control.'
      }
    ],
    cheatSheet: [
      { label: 'Load .env file', snippet: 'from dotenv import load_dotenv\nload_dotenv()', note: 'Loads file into os.environ' },
      { label: 'Read env var', snippet: 'key = os.getenv("API_KEY")', note: 'Returns None if unset' },
      { label: 'Bearer Header', snippet: '{"Authorization": f"Bearer {token}"}', note: 'Auth standard' },
      { label: 'Post JSON request', snippet: 'requests.post(url, json=data, headers=h)', note: 'Auto-serializes body' }
    ]
  },

  // ==========================================
  // MODULE 11: BUILDING REAL AI ASSISTANTS
  // ==========================================
  {
    id: 'module-11-ai-assistants',
    number: 11,
    title: 'Building Real AI Applications & Assistants',
    subtitle: 'Prompt Architecture, Pydantic Schema Validation, Chatbot Loops, and Streaming Tokens',
    duration: '60 min',
    category: 'AI Engineering',
    aiRelevance: 'This is where all foundational Python skills unite: building real conversational AI assistants, validating structured outputs with Pydantic, enforcing tool calling schemas, and streaming real-time tokens to end users.',
    keyTakeaways: [
      'Structure prompt messages into System, User, and Assistant roles',
      'Validate structured model responses using Pydantic BaseModel schemas',
      'Implement a stateful terminal chatbot loop with conversation memory',
      'Stream tokens in real-time using generator iteration',
      'Build a complete, working mini-agent in pure Python'
    ],
    sections: [
      {
        id: '11-1-pydantic-validation',
        title: 'Structured AI Outputs with Pydantic',
        subtopicTag: 'Pydantic Schema Validation',
        conceptSummary: 'LLMs generate text, but production systems need strict, validated objects. Pydantic validates raw JSON into typed Python models.',
        content: [
          'Pydantic is the most popular data validation library in Python. It enforces type constraints at runtime.',
          'Define schemas by inheriting from `BaseModel`. If an LLM returns missing fields or incorrect types, Pydantic raises a clear `ValidationError`.',
          'Frontier models support "Structured Outputs" mode, which guarantees the JSON returned by the model conforms exactly to your Pydantic schema.'
        ],
        codeExample: {
          title: 'Validating LLM Extraction with Pydantic Schema',
          code: `# Simulating Pydantic schema validation logic
class ExtractedEntity:
    def __init__(self, name: str, entity_type: str, confidence: float):
        if not (0.0 <= confidence <= 1.0):
            raise ValueError("Confidence score must be between 0.0 and 1.0")
        self.name = str(name).strip()
        self.entity_type = str(entity_type).upper()
        self.confidence = float(confidence)
        
    def to_dict(self):
        return {"name": self.name, "type": self.entity_type, "score": round(self.confidence, 3)}

raw_llm_json = {"name": " Alan Turing ", "entity_type": "person", "confidence": 0.982}

entity = ExtractedEntity(**raw_llm_json)
print("Validated Schema Object:")
print(entity.to_dict())`,
          explanation: 'Pydantic models turn ambiguous strings into reliable Python objects that downstream database schemas and APIs can trust.',
          expectedOutput: `Validated Schema Object:
{'name': 'Alan Turing', 'type': 'PERSON', 'score': 0.982}`
        }
      },
      {
        id: '11-2-chatbot-memory-loop',
        title: 'Building a Stateful Chatbot Loop with Memory',
        subtopicTag: 'Chatbot Memory Loop',
        conceptSummary: 'LLM APIs are stateless: every request is independent. A chatbot assistant must maintain message history across multiple user turns.',
        content: [
          'A chat loop repeatedly prompts the user for input, appends it to memory, sends the entire history to the model, and appends the model response.',
          'To prevent context window overflow and excessive token costs, production systems implement sliding window truncation or conversation summarization.',
          'A while loop with an exit condition (`if user_input.lower() in ["exit", "quit"]: break`) provides the standard command-line interface.'
        ],
        codeExample: {
          title: 'Complete Stateful Chat Assistant Simulator',
          code: `class AIAssistant:
    def __init__(self, system_persona: str, max_turns: int = 5):
        self.history = [{"role": "system", "content": system_persona}]
        self.max_turns = max_turns
        
    def chat(self, user_message: str) -> str:
        self.history.append({"role": "user", "content": user_message})
        
        reply = f"Echo Assistant: Received '{user_message}'. Ready for next command."
        self.history.append({"role": "assistant", "content": reply})
        
        if len(self.history) > (self.max_turns * 2 + 1):
            self.history = [self.history[0]] + self.history[-self.max_turns * 2:]
            
        return reply

bot = AIAssistant("You are a helpful Python mentor.")
print("Turn 1:", bot.chat("How do I learn Python for AI?"))
print("Turn 2:", bot.chat("What project should I build first?"))
print(f"Current history length: {len(bot.history)} messages")`,
          explanation: 'Maintaining conversation history gives the illusion of ongoing memory across stateless HTTP API requests.',
          expectedOutput: `Turn 1: Echo Assistant: Received 'How do I learn Python for AI?'. Ready for next command.
Turn 2: Echo Assistant: Received 'What project should I build first?'. Ready for next command.
Current history length: 5 messages`
        }
      }
    ],
    exercise: {
      title: 'Practice: Build a Prompt Template Generator',
      instruction: 'Write a function generate_prompt(task_desc: str, examples: list[str]) -> str that formats a few-shot prompt with header "TASK: <task_desc>\\nEXAMPLES:\\n" followed by numbered examples.',
      starterCode: `def generate_prompt(task_desc: str, examples: list[str]) -> str:
    # TODO: Build few-shot prompt template
    pass

samples = ["'positive' -> Good service", "'negative' -> Defective product"]
print(generate_prompt("Classify review sentiment", samples))`,
      solutionCode: `def generate_prompt(task_desc: str, examples: list[str]) -> str:
    formatted_examples = "\\n".join(f"{i}. {ex}" for i, ex in enumerate(examples, 1))
    return f"TASK: {task_desc}\\nEXAMPLES:\\n{formatted_examples}"

samples = ["'positive' -> Good service", "'negative' -> Defective product"]
print(generate_prompt("Classify review sentiment", samples))`,
      hint: 'Use a generator expression inside `"\\n".join(...)` with enumerate.',
      testCaseDescription: 'Formats numbered few-shot prompt string.',
      expectedOutput: `TASK: Classify review sentiment\nEXAMPLES:\n1. 'positive' -> Good service\n2. 'negative' -> Defective product`
    },
    quiz: [
      {
        id: 'q11-1',
        question: 'Why are LLM APIs described as "stateless"?',
        options: [
          'They do not retain memory of previous API calls; each request must include the full conversation history to maintain context',
          'They only execute on state machine microcontrollers',
          'They cannot process numerical states',
          'They only work in countries with no state regulations'
        ],
        correctIndex: 0,
        explanation: 'Each call to an LLM endpoint is completely independent. The client application must send preceding chat messages with every request to give the model context.'
      }
    ],
    flashcards: [
      {
        id: 'fc11-1',
        front: 'What role does Pydantic play in AI application development?',
        back: 'It validates, coerces, and parses raw text/JSON from AI models into type-safe Python data models with guaranteed structure.',
        aiContext: 'The core library behind LangChain, LlamaIndex, Instructor, and FastAPI.'
      },
      {
        id: 'fc11-2',
        front: 'What are the three standard roles in a chat completion message list?',
        back: '`system` (instructions/persona), `user` (human query), and `assistant` (AI response).',
        aiContext: 'Universal format across OpenAI, Anthropic, Gemini, and open-source models.'
      }
    ],
    cheatSheet: [
      { label: 'System message', snippet: '{"role": "system", "content": "..."}', note: 'Sets persona' },
      { label: 'User message', snippet: '{"role": "user", "content": "..."}', note: 'User prompt' },
      { label: 'Assistant message', snippet: '{"role": "assistant", "content": "..."}', note: 'Model response' },
      { label: 'Pydantic BaseModel', snippet: 'class Output(BaseModel):\n  summary: str\n  tags: list[str]', note: 'Schema validation' }
    ]
  },

  // ==========================================
  // MODULE 12: PRODUCTION-GRADE WORKFLOW
  // ==========================================
  {
    id: 'module-12-production',
    number: 12,
    title: 'Production-Grade AI Engineering Workflow',
    subtitle: 'Ruff Linter & Formatter, Git & GitHub Version Control, and Deployment Readiness',
    duration: '45 min',
    category: 'AI Engineering',
    aiRelevance: 'Writing a prototype in a Jupyter notebook is easy; shipping reliable, scalable AI systems requires software engineering rigor. Mastering Ruff, Git version control, lockfiles, and containerization separates amateur coders from hireable AI Engineers.',
    keyTakeaways: [
      'Automate code cleanliness with Ruff: 10x faster linting and formatting',
      'Follow Git best practices for AI projects: branches, commits, and safe .gitignore rules',
      'Lock dependencies reproducibly with uv.lock or pyproject.toml',
      'Structure production FastAPI endpoints for serving AI models and agents',
      'Prepare AI applications for Docker containerization and cloud deployment'
    ],
    sections: [
      {
        id: '12-1-ruff-linting',
        title: 'Modern Code Quality with Ruff',
        subtopicTag: 'Ruff Linter & Formatter',
        conceptSummary: 'Ruff is an extremely fast Python linter and code formatter written in Rust that replaces Flake8, Black, isort, and Bandit.',
        content: [
          'Code quality matters: unused imports, undefined variables, and inconsistent spacing slow down teams and cause runtime crashes in production.',
          'Install Ruff via uv: `uv add --dev ruff`.',
          'Run linter checks: `uv run ruff check .` checks your entire codebase in milliseconds.',
          'Auto-fix issues: `uv run ruff check --fix .` fixes imports and simple errors automatically.',
          'Format code: `uv run ruff format .` formats all code cleanly to PEP 8 standards, replacing Black.'
        ],
        codeExample: {
          title: 'Configuring Ruff in pyproject.toml',
          code: `pyproject_content = """
[project]
name = "ai-agent-service"
version = "0.1.0"
dependencies = [
    "openai>=1.20.0",
    "pydantic>=2.6.0",
    "python-dotenv>=1.0.0"
]

[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I"]  # pycodestyle, Pyflakes, isort
"""

print("Standard Modern AI pyproject.toml:")
print(pyproject_content.strip())`,
          explanation: 'pyproject.toml is the standardized single source of truth for both dependencies and tool configurations in modern Python.',
          expectedOutput: `Standard Modern AI pyproject.toml:
[project]
name = "ai-agent-service"
version = "0.1.0"
dependencies = [
    "openai>=1.20.0",
    "pydantic>=2.6.0",
    "python-dotenv>=1.0.0"
]

[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I"]  # pycodestyle, Pyflakes, isort`
        }
      },
      {
        id: '12-2-git-and-deployment',
        title: 'Git Version Control & Deployment Readiness',
        subtopicTag: 'Git, GitHub & .gitignore',
        conceptSummary: 'Version control tracks changes and enables collaboration. A bulletproof .gitignore prevents accidental leakage of API keys or large model weights.',
        content: [
          'Mandatory `.gitignore` entries for AI repositories:',
          '• `.env`: Keep API keys private.',
          '• `.venv/`: Never commit virtual environments.',
          '• `__pycache__/` and `*.pyc`: Compiled Python bytecode.',
          '• `*.safetensors`, `*.bin`, `*.pt`: Large model weight binaries (store in Hugging Face or S3 instead).',
          'Core Git workflow: `git init`, `git add .`, `git commit -m "feat: add streaming agent"`, `git push origin main`.'
        ],
        codeExample: {
          title: 'Validating Gitignore Rules Programmatically',
          code: `gitignore_rules = {".env", ".venv", "__pycache__", "*.pt", "*.safetensors"}
files_to_commit = ["src/main.py", ".env", "pyproject.toml", "weights.pt"]

print("Git Pre-Commit Safety Check:")
for f in files_to_commit:
    is_ignored = (
        f in gitignore_rules or 
        any(rule.startswith("*") and f.endswith(rule[1:]) for rule in gitignore_rules)
    )
    status = "BLOCKED (Protected)" if is_ignored else "ALLOWED (Safe to commit)"
    print(f"  • {f:<16} -> {status}")`,
          explanation: 'Automating git hygiene guarantees API keys and gigabyte-sized weight files never pollute git history.',
          expectedOutput: `Git Pre-Commit Safety Check:
  • src/main.py      -> ALLOWED (Safe to commit)
  • .env             -> BLOCKED (Protected)
  • pyproject.toml   -> ALLOWED (Safe to commit)
  • weights.pt       -> BLOCKED (Protected)`
        }
      }
    ],
    exercise: {
      title: 'Practice: Build a Pre-Commit Validator',
      instruction: 'Write a function validate_repo_files(file_list: list[str]) -> list[str] that returns only the files that are safe to commit (exclude .env, .venv, and files ending with .pt).',
      starterCode: `def validate_repo_files(file_list: list[str]) -> list[str]:
    # TODO: Filter out .env, .venv, and *.pt files
    pass

test_files = ["app.py", ".env", "README.md", "model.pt", ".venv"]
print("Safe files:", validate_repo_files(test_files))`,
      solutionCode: `def validate_repo_files(file_list: list[str]) -> list[str]:
    return [
        f for f in file_list 
        if f not in [".env", ".venv"] and not f.endswith(".pt")
    ]

test_files = ["app.py", ".env", "README.md", "model.pt", ".venv"]
print("Safe files:", validate_repo_files(test_files))`,
      hint: 'Use a list comprehension checking `f not in [".env", ".venv"] and not f.endswith(".pt")`.',
      testCaseDescription: 'Filters out .env, .venv, and model.pt',
      expectedOutput: `Safe files: ['app.py', 'README.md']`
    },
    quiz: [
      {
        id: 'q12-1',
        question: 'What command in Ruff automatically formats all Python files to PEP 8 standards?',
        options: [
          'uv run ruff clean',
          'uv run ruff format .',
          'uv run ruff check --delete',
          'uv run ruff build'
        ],
        correctIndex: 1,
        explanation: '`ruff format .` is the lightning-fast drop-in replacement for Black, formatting all codebase files instantaneously.'
      }
    ],
    flashcards: [
      {
        id: 'fc12-1',
        front: 'What is Ruff and why has the Python community adopted it?',
        back: 'An ultra-fast Python linter and formatter written in Rust, running 10x-100x faster than traditional tools (Flake8, Black, isort).',
        aiContext: 'Saves valuable developer time when maintaining large AI repositories and CI/CD pipelines.'
      },
      {
        id: 'fc12-2',
        front: 'Why should machine learning model weights (*.pt, *.safetensors) not be stored directly in Git?',
        back: 'Git is designed for text diffs, not multi-gigabyte binary files. Large binaries bloat repository clones and exceed GitHub file size limits.',
        aiContext: 'Store model weights in Hugging Face Hub, AWS S3, or Google Cloud Storage instead.'
      }
    ],
    cheatSheet: [
      { label: 'Ruff Check', snippet: 'uv run ruff check .', note: 'Fast lint check' },
      { label: 'Ruff Auto-fix', snippet: 'uv run ruff check --fix .', note: 'Fix imports & errors' },
      { label: 'Ruff Format', snippet: 'uv run ruff format .', note: 'PEP 8 formatter' },
      { label: 'Git commit with message', snippet: 'git commit -m "feat: add agent"', note: 'Clear commit message' }
    ]
  }
];

export const AI_ROADMAP_STEPS = [
  {
    step: 1,
    title: 'Modern Tooling & Environments',
    desc: 'Install Python 3.12+, configure VS Code, and master Astral uv for instant package management.',
    modules: [1],
    duration: 'Week 1'
  },
  {
    step: 2,
    title: 'Python Syntax & Logic Foundations',
    desc: 'PEP 8 discipline, arithmetic (+, -, *, /, //, %, **), shortcut assignments (+=), f-strings, conditionals, and loops.',
    modules: [2, 3, 4],
    duration: 'Week 2'
  },
  {
    step: 3,
    title: 'Data Structures for AI Systems',
    desc: 'Lists, list comprehensions, nested JSON dictionaries, tuples, and deduplicating sets.',
    modules: [5],
    duration: 'Week 3'
  },
  {
    step: 4,
    title: 'Functional & Object-Oriented Architecture',
    desc: 'Type hints for tool calling, *args/**kwargs, classes, chat memory, and @dataclass schemas.',
    modules: [6, 7],
    duration: 'Week 4'
  },
  {
    step: 5,
    title: 'Data Processing & Resilient APIs',
    desc: 'Defensive try/except retries with exponential backoff, JSON file I/O, Pandas, and requests.',
    modules: [8, 9, 10],
    duration: 'Week 5'
  },
  {
    step: 6,
    title: 'AI Assistants & Production Engineering',
    desc: 'Pydantic output validation, stateful chatbot loops, streaming tokens, Ruff, and Git workflow.',
    modules: [11, 12],
    duration: 'Week 6'
  }
];
