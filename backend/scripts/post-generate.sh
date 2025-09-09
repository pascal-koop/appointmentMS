#!/bin/bash

# Post-generation script for custom NestJS schematics
# This script runs after generating a controller to perform additional customizations

echo "🎉 Custom controller generation completed!"
echo "📁 Files have been created with your custom structure"
echo ""
echo "📋 Generated files include:"
echo "   - Controller with comprehensive CRUD operations"
echo "   - Service with error handling and documentation"
echo "   - DTOs with validation and Swagger documentation"
echo "   - Module file for proper dependency injection"
echo ""
echo "🔧 Next steps:"
echo "   1. Review the generated files"
echo "   2. Implement actual database logic in the service"
echo "   3. Add the module to your app.module.ts imports"
echo "   4. Test your new endpoints"
echo ""
echo "💡 Tips:"
echo "   - Use 'nest g controller [name] --dry-run' to preview what would be generated"
echo "   - Customize the templates in schematics/controller/files/ to match your needs"
echo "   - Add more validation rules to the DTOs as needed"