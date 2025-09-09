# Custom Controller Generation Guide

This guide explains how to customize NestJS controller generation to match your preferred structure and coding standards.

## 🎯 What We've Set Up

We've created a practical approach to customize controller generation that works with the current NestJS CLI:

1. **Custom Script**: A Node.js script that customizes generated files
2. **Template Files**: Ready-to-use templates for controllers, services, and DTOs
3. **Documentation**: Comprehensive guides and examples

## 🚀 How to Use

### Method 1: One-Command Generation (Recommended)

```bash
# Generate complete controller with service, DTOs, and module
./scripts/generate-custom-controller.sh users
```

This single command will generate everything you need!

### Method 2: Step-by-Step Generation

### Step 1: Generate a Basic Controller

First, generate a controller using the standard NestJS CLI:

```bash
# Generate a controller
nest g controller users

# Or with a specific path
nest g controller users --path src/modules
```

### Step 2: Customize and Create Additional Files

Run the customization script to transform the basic controller and create all additional files:

```bash
# Customize the generated controller and create service, DTOs, and module
node scripts/customize-controller.js users
```

**Note**: The script will automatically create the service, DTOs, and module files if they don't exist.

### Step 3: Review and Implement

The script will create:
- ✅ Enhanced controller with full CRUD operations
- ✅ **Complete service** with error handling and documentation (created if missing)
- ✅ **DTOs** with validation and Swagger documentation (created automatically)
- ✅ **Module file** with proper imports and exports (created automatically)
- ✅ **Updated app.module.ts** with the new module imported

## 📁 Generated File Structure

After running the customization script, you'll have:

```
src/users/
├── users.controller.ts          # Enhanced controller with CRUD + Swagger
├── users.service.ts             # Service with error handling
├── users.module.ts              # Module configuration
└── dto/
    ├── create-users.dto.ts      # Create DTO with validation
    └── update-users.dto.ts      # Update DTO (extends create)
```

## 🔧 Features Included

### Controller Features
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete endpoints
- ✅ **Swagger Documentation**: Complete API documentation with `@ApiTags`, `@ApiOperation`, `@ApiResponse`
- ✅ **Query Parameters**: Pagination support with `page` and `limit` parameters
- ✅ **Path Parameters**: ID-based operations with validation
- ✅ **Error Handling**: Proper HTTP status codes and error responses

### Service Features
- ✅ **Complete CRUD Operations**: Full create, read, update, delete functionality
- ✅ **Async/Await Pattern**: Modern JavaScript/TypeScript patterns
- ✅ **Error Handling**: Custom exceptions with meaningful messages
- ✅ **JSDoc Documentation**: Comprehensive method documentation
- ✅ **Mock Implementations**: Ready-to-test mock responses
- ✅ **TODO Comments**: Clear guidance for implementing actual database logic
- ✅ **Automatic Creation**: Service is created if it doesn't exist

### DTO Features
- ✅ **Validation**: Comprehensive validation using `class-validator`
- ✅ **Swagger Documentation**: API property documentation with examples
- ✅ **Type Safety**: Full TypeScript type safety
- ✅ **Optional Fields**: Proper handling of optional properties
- ✅ **Automatic Creation**: DTOs are created with proper validation rules

## 📝 Example Generated Controller

```typescript
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user record in the system'
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateUserDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all user records'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.usersService.findAll(page, limit);
  }

  // ... more endpoints
}
```

## 🎨 Customization Options

### Modifying the Script

You can customize the `scripts/customize-controller.js` file to:

1. **Change Validation Rules**: Modify the DTO validation decorators
2. **Add Custom Endpoints**: Include additional controller methods
3. **Modify Swagger Documentation**: Customize API documentation
4. **Change File Structure**: Modify the directory layout
5. **Add Custom Imports**: Include additional dependencies

### Template Variables

The script uses these variables for customization:
- `controllerName`: The original name (e.g., "users")
- `capitalizeFirst(controllerName)`: PascalCase (e.g., "Users")

## 🔄 Workflow

### Complete Workflow Example

```bash
# 1. Generate basic controller
nest g controller products

# 2. Customize and create additional files
node scripts/customize-controller.js products

# 3. Review generated files
ls src/products/

# 4. Test your endpoints
npm run start:dev
# Visit http://localhost:3000/api for Swagger documentation
```

**Note**: The `app.module.ts` is automatically updated to import the new module.

## 🛠️ Advanced Customization

### Adding Custom Validation

Edit the DTO templates in the script to add more validation:

```javascript
// In the createDTOs function, add more validation decorators
@IsUUID()
@ApiProperty({ description: 'Unique identifier' })
id: string;

@IsEnum(['active', 'inactive'])
@ApiProperty({ enum: ['active', 'inactive'] })
status: string;
```

### Adding Custom Endpoints

Modify the controller template to include additional endpoints:

```javascript
// Add custom endpoints like search, bulk operations, etc.
@Get('search')
@ApiOperation({ summary: 'Search users' })
search(@Query('q') query: string) {
  return this.usersService.search(query);
}
```

### Custom File Structure

Modify the script to create different directory structures:

```javascript
// Create nested structure
const dtoPath = path.join(basePath, 'dto', 'requests');
const responsePath = path.join(basePath, 'dto', 'responses');
```

## 🧪 Testing Your Custom Controller

### 1. Start the Development Server

```bash
npm run start:dev
```

### 2. Access Swagger Documentation

Visit `http://localhost:3000/api` to see your API documentation.

### 3. Test Endpoints

Use the Swagger UI or tools like Postman to test:
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## 📚 Best Practices

### 1. Always Use Dry Run First

```bash
nest g controller test --dry-run
```

### 2. Review Generated Files

Always review the generated files before implementing business logic.

### 3. Customize Templates

Modify the script templates to match your team's coding standards.

### 4. Add Proper Validation

Enhance DTOs with validation rules specific to your domain.

### 5. Implement Database Logic

Replace the mock implementations with actual database operations.

## 🐛 Troubleshooting

### Common Issues

1. **Script not found**: Ensure the script is in the `scripts/` directory
2. **Permission denied**: Make sure the script is executable (`chmod +x`)
3. **Import errors**: Check that all required dependencies are installed
4. **Validation errors**: Verify DTO properties match your requirements

### Getting Help

- Check the generated files for syntax errors
- Review the script for missing variables
- Ensure all dependencies are installed (`@nestjs/swagger`, `class-validator`, etc.)

## 🎉 Benefits of This Approach

1. **Consistency**: All generated controllers follow the same structure
2. **Time Saving**: Generate comprehensive boilerplate code quickly
3. **Best Practices**: Enforce coding standards automatically
4. **Documentation**: Generate complete API documentation
5. **Maintainability**: Easy to modify and extend

## 🔮 Future Enhancements

You can extend this approach by:

1. **Creating More Schematics**: Add scripts for services, modules, etc.
2. **Database Integration**: Add repository generation
3. **Testing**: Generate test files with the same structure
4. **CI/CD Integration**: Automate the customization process

---

**Happy coding! 🚀**

This approach gives you the flexibility to customize controller generation while working within the constraints of the current NestJS CLI.