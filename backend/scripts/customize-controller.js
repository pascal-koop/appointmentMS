#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Customize Controller Script
 * This script customizes generated NestJS controller files to match your preferred structure
 */

function customizeController(controllerName) {
  const basePath = path.join(__dirname, '..', 'src', controllerName);

  console.log(`🎨 Customizing controller: ${controllerName}`);

  // Customize controller file
  customizeControllerFile(basePath, controllerName);

  // Create service file if it doesn't exist
  createServiceFile(basePath, controllerName);

  // Create DTOs
  createDTOs(basePath, controllerName);

  // Create module file
  createModuleFile(basePath, controllerName);

  // Update app.module.ts to import the new module
  updateAppModule(controllerName);

  console.log(`✅ Controller customization completed for: ${controllerName}`);
}

function customizeControllerFile(basePath, controllerName) {
  const controllerPath = path.join(basePath, `${controllerName}.controller.ts`);

  if (!fs.existsSync(controllerPath)) {
    console.log(`⚠️  Controller file not found: ${controllerPath}`);
    return;
  }

  const controllerContent = `import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ${capitalizeFirst(controllerName)}Service } from './${controllerName}.service';
import { Create${capitalizeFirst(controllerName)}Dto } from './dto/create-${controllerName}.dto';

@Controller('${controllerName}')
export class ${capitalizeFirst(controllerName)}Controller {
  constructor(private readonly ${controllerName}Service: ${capitalizeFirst(controllerName)}Service) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new ${controllerName}',
    description: 'Creates a new ${controllerName} record in the system',
    operationId: 'create${capitalizeFirst(controllerName)}',
  })
  create${capitalizeFirst(controllerName)}(@Body() create${capitalizeFirst(controllerName)}Dto: Create${capitalizeFirst(controllerName)}Dto) {
    return this.${controllerName}Service.create${capitalizeFirst(controllerName)}(create${capitalizeFirst(controllerName)}Dto);
  }
}
`;

  fs.writeFileSync(controllerPath, controllerContent);
  console.log(`✅ Controller file customized: ${controllerPath}`);
}

function createServiceFile(basePath, controllerName) {
  const servicePath = path.join(basePath, `${controllerName}.service.ts`);

  // If service already exists, customize it; otherwise create it
  if (fs.existsSync(servicePath)) {
    customizeServiceFile(basePath, controllerName);
  } else {
    console.log(`📝 Creating service file: ${servicePath}`);
    const serviceContent = generateServiceContent(controllerName);
    fs.writeFileSync(servicePath, serviceContent);
    console.log(`✅ Service file created: ${servicePath}`);
  }
}

function customizeServiceFile(basePath, controllerName) {
  const servicePath = path.join(basePath, `${controllerName}.service.ts`);

  if (!fs.existsSync(servicePath)) {
    console.log(`⚠️  Service file not found: ${servicePath}`);
    return;
  }

  const serviceContent = `import { Injectable } from '@nestjs/common';
import { Create${capitalizeFirst(controllerName)}Dto } from './dto/create-${controllerName}.dto';

@Injectable()
export class ${capitalizeFirst(controllerName)}Service {
  // In a real application, you would inject a repository or database service here
  // constructor(private readonly ${controllerName}Repository: ${capitalizeFirst(controllerName)}Repository) {}

}
`;

  fs.writeFileSync(servicePath, serviceContent);
  console.log(`✅ Service file customized: ${servicePath}`);
}

function generateServiceContent(controllerName) {
  return `import { Injectable } from '@nestjs/common';
import { Create${capitalizeFirst(controllerName)}Dto } from './dto/create-${controllerName}.dto';

@Injectable()
export class ${capitalizeFirst(controllerName)}Service {
  // In a real application, you would inject a repository or database service here
  // constructor(private readonly ${controllerName}Repository: ${capitalizeFirst(controllerName)}Repository) {}

  create${capitalizeFirst(controllerName)}(create${capitalizeFirst(controllerName)}Dto: Create${capitalizeFirst(controllerName)}Dto) {
    return console.log(create${capitalizeFirst(controllerName)}Dto);
  }
}
`;
}

function createDTOs(basePath, controllerName) {
  const dtoPath = path.join(basePath, 'dto');

  // Create dto directory if it doesn't exist
  if (!fs.existsSync(dtoPath)) {
    fs.mkdirSync(dtoPath, { recursive: true });
  }

  // Create DTO file
  const createDtoPath = path.join(dtoPath, `create-${controllerName}.dto.ts`);
  const createDtoContent = `export class Create${capitalizeFirst(controllerName)}Dto {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}
`;

  fs.writeFileSync(createDtoPath, createDtoContent);
  console.log(`✅ Create DTO file created: ${createDtoPath}`);

  // Create Update DTO file
  const updateDtoPath = path.join(dtoPath, `update-${controllerName}.dto.ts`);
  const updateDtoContent = `import { PartialType } from '@nestjs/swagger';
import { Create${capitalizeFirst(controllerName)}Dto } from './create-${controllerName}.dto';

export class Update${capitalizeFirst(controllerName)}Dto extends PartialType(Create${capitalizeFirst(controllerName)}Dto) {}
`;

  fs.writeFileSync(updateDtoPath, updateDtoContent);
  console.log(`✅ Update DTO file created: ${updateDtoPath}`);
}

function createModuleFile(basePath, controllerName) {
  const modulePath = path.join(basePath, `${controllerName}.module.ts`);

  const moduleContent = `import { Module } from '@nestjs/common';
import { ${capitalizeFirst(controllerName)}Service } from './${controllerName}.service';
import { ${capitalizeFirst(controllerName)}Controller } from './${controllerName}.controller';

@Module({
  controllers: [${capitalizeFirst(controllerName)}Controller],
  providers: [${capitalizeFirst(controllerName)}Service],
  exports: [${capitalizeFirst(controllerName)}Service],
})
export class ${capitalizeFirst(controllerName)}Module {}
`;

  fs.writeFileSync(modulePath, moduleContent);
  console.log(`✅ Module file created: ${modulePath}`);
}

function updateAppModule(controllerName) {
  const appModulePath = path.join(__dirname, '..', 'src', 'app.module.ts');

  if (!fs.existsSync(appModulePath)) {
    console.log(`⚠️  App module file not found: ${appModulePath}`);
    return;
  }

  let appModuleContent = fs.readFileSync(appModulePath, 'utf8');

  // Check if the module is already imported
  const moduleName = `${capitalizeFirst(controllerName)}Module`;
  const controllerNamePascal = capitalizeFirst(controllerName);
  const importStatement = `import { ${moduleName} } from './${controllerName}/${controllerName}.module';`;

  // Remove individual controller and service imports if they exist
  const controllerImport = `import { ${controllerNamePascal}Controller } from './${controllerName}/${controllerName}.controller';`;
  const serviceImport = `import { ${controllerNamePascal}Service } from './${controllerName}/${controllerName}.service';`;

  appModuleContent = appModuleContent.replace(controllerImport, '');
  appModuleContent = appModuleContent.replace(serviceImport, '');

  // Remove individual controller and service from controllers and providers arrays
  appModuleContent = appModuleContent.replace(new RegExp(`,\\s*${controllerNamePascal}Controller`, 'g'), '');
  appModuleContent = appModuleContent.replace(new RegExp(`${controllerNamePascal}Controller,?\\s*`, 'g'), '');
  appModuleContent = appModuleContent.replace(new RegExp(`,\\s*${controllerNamePascal}Service`, 'g'), '');
  appModuleContent = appModuleContent.replace(new RegExp(`${controllerNamePascal}Service,?\\s*`, 'g'), '');

  // Clean up empty arrays
  appModuleContent = appModuleContent.replace(/controllers:\s*\[\s*\]/, 'controllers: [AppController]');
  appModuleContent = appModuleContent.replace(/providers:\s*\[\s*\]/, 'providers: [AppService]');

  if (!appModuleContent.includes(importStatement)) {
    // Add import statement after existing imports
    const importRegex = /(import.*?;[\r\n]*?)(?=import|@Module)/gs;
    const lastImportMatch = [...appModuleContent.matchAll(importRegex)].pop();

    if (lastImportMatch) {
      const insertPosition = lastImportMatch.index + lastImportMatch[0].length;
      appModuleContent = appModuleContent.slice(0, insertPosition) +
                        importStatement + '\n' +
                        appModuleContent.slice(insertPosition);
    } else {
      // If no imports found, add after the first import
      const firstImportEnd = appModuleContent.indexOf(';') + 1;
      appModuleContent = appModuleContent.slice(0, firstImportEnd) +
                        '\n' + importStatement +
                        appModuleContent.slice(firstImportEnd);
    }

    // Add to imports array
    const importsRegex = /imports:\s*\[([^\]]*)\]/;
    const importsMatch = appModuleContent.match(importsRegex);

    if (importsMatch) {
      const currentImports = importsMatch[1].trim();
      const newImports = currentImports ? `${currentImports}, ${moduleName}` : moduleName;
      appModuleContent = appModuleContent.replace(importsRegex, `imports: [${newImports}]`);
    }

    fs.writeFileSync(appModulePath, appModuleContent);
    console.log(`✅ App module updated to import ${moduleName}`);
  } else {
    console.log(`ℹ️  ${moduleName} already imported in app module`);
  }
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get controller name from command line arguments
const controllerName = process.argv[2];

if (!controllerName) {
  console.log('❌ Please provide a controller name');
  console.log('Usage: node customize-controller.js <controller-name>');
  process.exit(1);
}

customizeController(controllerName);