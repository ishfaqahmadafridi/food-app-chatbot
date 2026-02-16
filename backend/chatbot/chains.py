
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.tools import StructuredTool
from django.conf import settings
from .tools import (
    get_menu_items, 
    search_food_item, 
    add_to_cart, 
    remove_from_cart,
    get_cart_items,
    create_food_item,
    delete_food_item,
    update_food_item,
    get_food_recipe,
    get_food_ingredients,
    get_cooking_tips
)


# Initialize LLM
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.3,
    api_key=settings.OPENAI_API_KEY,
)


# Define tools list
tools = [
    get_menu_items,
    search_food_item,
    add_to_cart,
    remove_from_cart,
    get_cart_items,
    create_food_item,
    delete_food_item,
    update_food_item,
    get_food_recipe,
    get_food_ingredients,
    get_cooking_tips
]


# Bind tools to the LLM
llm_with_tools = llm.bind_tools(tools)


# System prompt for the agent
system_prompt = """You are RestoBot, an intelligent restaurant assistant AI. You help customers with:

🍽️ CUSTOMER FEATURES:
- Browse menu and learn about dishes
- Add items to cart (e.g., "add 2 burgers")
- Remove items from cart (e.g., "remove pizza")
- View cart contents
- Get recipes and cooking instructions (e.g., "how to make burger")
- Get ingredients lists for dishes
- Get cooking tips and tricks

👨‍💼 ADMIN FEATURES (Login Required):
- Update menu items (price, description, availability)
- Admin must be authenticated to use these features

IMPORTANT RULES:
1. **Cart Operations**: Always use appropriate tools:
   - add_to_cart: When user says "add", "order", "buy", "get"
   - remove_from_cart: When user says "remove", "delete", "take out"
   - get_cart_items: When user says "show cart", "my cart", "what's in cart"

2. **Menu Queries**: Use get_menu_items for menu listings

3. **Food Knowledge**: When user asks "how to make", "recipe for", "ingredients":
   - Use get_food_recipe for cooking instructions
   - Use get_food_ingredients for ingredient lists
   - Use get_cooking_tips for cooking advice

4. **Admin Operations**: 
   - update_food_item requires admin login
   - Always check authentication status
   - Inform users if they need to login

5. **Be Conversational**: Respond naturally and friendly

6. **Stay on Topic**: Politely redirect non-food questions to restaurant topics

EXAMPLE WORKFLOWS:

User: "Add 2 burgers"
→ Use add_to_cart(item_name='burger', quantity=2)
→ Respond with confirmation

User: "How to make pizza?"
→ Use get_food_recipe(food_name='pizza')
→ Share the recipe

User: "Update burger price to 250" (Admin)
→ Check if user is authenticated admin
→ Use update_food_item(item_name='burger', new_price=250)
→ Confirm update

Always use tools - never make up menu items, prices, or cart contents!
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])


# Tool executor function
def execute_tools(ai_message):
    """Execute tool calls from AI message"""
    if not hasattr(ai_message, 'tool_calls') or not ai_message.tool_calls:
        return ai_message.content
    
    tool_map = {tool.name: tool for tool in tools}
    results = []

    
    for tool_call in ai_message.tool_calls:
        tool_name = tool_call['name']
        tool_args = tool_call.get('args', {})


        
        if tool_name in tool_map:
            try:
                result = tool_map[tool_name].invoke(tool_args)
                results.append(f"Tool {tool_name} result: {result}")
            except Exception as e:
                results.append(f"Error calling {tool_name}: {str(e)}")
                
        else:
            results.append(f"Tool {tool_name} not found")

    
    return "\n".join(results) if results else ai_message.content


# Create agent executor as a simple chain
# This follows: User input → LLM decides tools → Tools execute → LLM formats response
class AgentExecutor:
    def __init__(self, llm_with_tools, prompt, tools):
        self.llm_with_tools = llm_with_tools
        self.prompt = prompt
        self.tool_map = {tool.name: tool for tool in tools}
        self.llm = llm  # Plain LLM for final response streaming
    
    def invoke(self, inputs):
        """Execute the agent workflow"""
        try:
            # Step 1: Format prompt with user input
            messages = self.prompt.format_messages(input=inputs['input'])
            
            # Step 2: LLM decides which tools to use
            ai_message = self.llm_with_tools.invoke(messages)
            
            # Step 3: Execute tools if needed
            if hasattr(ai_message, 'tool_calls') and ai_message.tool_calls:
                tool_results = []
                for tool_call in ai_message.tool_calls:
                    tool_name = tool_call['name']
                    tool_args = tool_call.get('args', {})
                    
                    if tool_name in self.tool_map:
                        try:
                            result = self.tool_map[tool_name].invoke(tool_args)
                            tool_results.append(result)
                        except Exception as e:
                            tool_results.append(f"Error: {str(e)}")
                
                # Step 4: LLM formats final response with tool results
                final_prompt = ChatPromptTemplate.from_messages([
                    ("system", system_prompt),
                    ("human", inputs['input']),
                    ("assistant", f"I used tools and got these results: {' | '.join(tool_results)}. Now let me respond to the user."),
                ])
                final_response = self.llm.invoke(final_prompt.format_messages())
                return {"output": final_response.content}
            else:
                # No tools needed, return direct response
                return {"output": ai_message.content}
                
        except Exception as e:
            return {"output": f"Sorry, I encountered an error: {str(e)}"}
    
    def stream(self, inputs):
        """Execute the agent workflow with streaming response"""
        try:
            # Step 1: Format prompt with user input
            messages = self.prompt.format_messages(input=inputs['input'])
            
            # Step 2: LLM decides which tools to use (non-streaming for tool decision)
            ai_message = self.llm_with_tools.invoke(messages)
            
            # Step 3: Execute tools if needed
            if hasattr(ai_message, 'tool_calls') and ai_message.tool_calls:
                tool_results = []
                for tool_call in ai_message.tool_calls:
                    tool_name = tool_call['name']
                    tool_args = tool_call.get('args', {})
                    
                    if tool_name in self.tool_map:
                        try:
                            result = self.tool_map[tool_name].invoke(tool_args)
                            tool_results.append(result)
                        except Exception as e:
                            tool_results.append(f"Error: {str(e)}")
                
                # Step 4: Stream final response with tool results
                final_prompt = ChatPromptTemplate.from_messages([
                    ("system", system_prompt),
                    ("human", inputs['input']),
                    ("assistant", f"I used tools and got these results: {' | '.join(tool_results)}. Now let me respond to the user."),
                ])
                
                # Stream the response
                for chunk in self.llm.stream(final_prompt.format_messages()):
                    if hasattr(chunk, 'content') and chunk.content:
                        yield chunk.content
            else:
                # No tools needed, stream direct response
                for chunk in self.llm.stream(messages):
                    if hasattr(chunk, 'content') and chunk.content:
                        yield chunk.content
                        
        except Exception as e:
            yield f"Sorry, I encountered an error: {str(e)}"


# Create the agent executor instance
agent_executor = AgentExecutor(llm_with_tools, prompt, tools)
