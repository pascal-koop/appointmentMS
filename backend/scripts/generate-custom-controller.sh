#!/bin/bash

# Custom Controller Generator Script
# This script generates a controller and service, then customizes them with your preferred structure

if [ $# -eq 0 ]; then
    echo "❌ Please provide a controller name"
    echo "Usage: ./generate-custom-controller.sh <controller-name>"
    echo ""
    echo "Examples:"
    echo "  ./generate-custom-controller.sh users"
    echo "  ./generate-custom-controller.sh products"
    echo "  ./generate-custom-controller.sh orders"
    exit 1
fi

CONTROLLER_NAME=$1

echo "🚀 Generating custom controller: $CONTROLLER_NAME"
echo ""

# Step 1: Generate controller
echo "📝 Step 1: Generating controller..."
nest g controller $CONTROLLER_NAME

# Step 2: Customize the generated files (creates service, DTOs, and module)
echo "🎨 Step 2: Customizing files with your preferred structure..."
node scripts/customize-controller.js $CONTROLLER_NAME

echo ""
echo "✅ Custom controller generation completed!"
echo ""
echo "📁 Generated files:"
echo "   - src/$CONTROLLER_NAME/$CONTROLLER_NAME.controller.ts"
echo "   - src/$CONTROLLER_NAME/$CONTROLLER_NAME.service.ts"
echo "   - src/$CONTROLLER_NAME/$CONTROLLER_NAME.module.ts"
echo "   - src/$CONTROLLER_NAME/dto/create-$CONTROLLER_NAME.dto.ts"
echo "   - src/$CONTROLLER_NAME/dto/update-$CONTROLLER_NAME.dto.ts"
echo "   - Updated src/app.module.ts (module imported)"
echo ""
echo "🔧 Next steps:"
echo "   1. Review the generated files"
echo "   2. Implement actual database logic in the service"
echo "   3. Test your new endpoints"
echo "   4. Visit http://localhost:3000/api for Swagger documentation"
echo ""
echo "💡 Tips:"
echo "   - Use 'nest g controller [name] --dry-run' to preview what would be generated"
echo "   - Customize the templates in scripts/customize-controller.js to match your needs"
echo "   - Add more validation rules to the DTOs as needed"