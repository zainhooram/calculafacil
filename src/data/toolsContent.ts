import { CategoryId, ToolId } from './config';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolLocaleContent {
  slug: string;
  url: string;
  name: string;
  shortDescription: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  introParagraph: string;
  instructionsTitle: string;
  instructions: string[];
  formulaTitle: string;
  formulaBlock: string[];
  formulaExplanation: string;
  exampleTitle: string;
  exampleText: string;
  faqs: ToolFAQ[];
}

export interface ToolDefinition {
  id: ToolId;
  category: CategoryId;
  popular: boolean;
  hasCurrency: boolean;
  relatedTools: ToolId[];
  es: ToolLocaleContent;
  en: ToolLocaleContent;
}

export const TOOLS_DATA: Record<ToolId, ToolDefinition> = {
  'profit-margin': {
    id: 'profit-margin',
    category: 'business',
    popular: true,
    hasCurrency: true,
    relatedTools: ['selling-price', 'break-even', 'discount'],
    es: {
      slug: 'calculadora-margen-beneficio',
      url: '/es/herramientas/calculadora-margen-beneficio.html',
      name: 'Calculadora de margen de beneficio',
      shortDescription:
        'Calcula el beneficio neto por unidad, el porcentaje de margen sobre las ventas y el recargo (markup) sobre el coste.',
      seoTitle: 'Calculadora de Margen de Beneficio y Recargo — CalculaFácil',
      metaDescription:
        'Calcula gratis el margen de beneficio, la ganancia por venta y el porcentaje de recargo (markup) a partir del coste y el precio de venta.',
      h1: 'Calculadora de margen de beneficio',
      introParagraph:
        'Conoce al instante la rentabilidad real de tus productos o servicios. Esta calculadora compara tu precio de coste con tu precio de venta para mostrar la ganancia monetaria, el margen de beneficio sobre la venta y el porcentaje de recargo sobre el coste.',
      instructionsTitle: 'Cómo usar la calculadora de margen de beneficio',
      instructions: [
        'Selecciona tu moneda de visualización preferida (EUR, USD, MXN, ARS, COP, CLP, GBP o PKR).',
        'Introduce el precio de coste unitario (lo que te cuesta fabricar o adquirir el producto).',
        'Introduce el precio de venta al que ofreces el producto o servicio a tus clientes.',
        'Consulta al instante el beneficio monetario, el porcentaje de margen de beneficio y el porcentaje de recargo (markup).',
      ],
      formulaTitle: 'Fórmulas del margen de beneficio y recargo',
      formulaBlock: [
        'Beneficio = Precio de Venta − Precio de Coste',
        'Margen de Beneficio (%) = (Beneficio / Precio de Venta) × 100',
        'Recargo o Markup (%) = (Beneficio / Precio de Coste) × 100',
      ],
      formulaExplanation:
        'El margen de beneficio indica qué porcentaje del precio de venta final se convierte en ganancia bruta, mientras que el recargo (markup) muestra cuánto se ha incrementado porcentualmente el precio respecto al coste original.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Si compras un artículo por 60,00 EUR y lo vendes por 100,00 EUR: tu beneficio es de 40,00 EUR. El margen de beneficio sobre la venta es del 40,00% (40 / 100 × 100), mientras que el recargo sobre el coste es del 66,67% (40 / 60 × 100).',
      faqs: [
        {
          question: '¿Cuál es la diferencia entre margen de beneficio y recargo (markup)?',
          answer:
            'El margen de beneficio calcula la ganancia como porcentaje del precio de venta (Beneficio / Venta). El recargo o markup calcula la ganancia como porcentaje del precio de coste (Beneficio / Coste). Por eso, para un mismo producto con ganancia positiva, el porcentaje de recargo siempre es mayor que el margen.',
        },
        {
          question: '¿Qué ocurre si el precio de venta es menor que el precio de coste?',
          answer:
            'Si vendes por debajo del coste, la calculadora mostrará un beneficio negativo (pérdida) y un porcentaje de margen negativo para alertarte de que la operación no cubre los costes directos.',
        },
        {
          question: '¿Incluye este cálculo el IVA u otros impuestos indirectos?',
          answer:
            'Para obtener un análisis financiero exacto, se recomienda introducir tanto el precio de coste como el precio de venta sin IVA (importes netos), ya que el impuesto sobre el valor añadido se recauda para la administración tributaria y no forma parte del ingreso real del negocio.',
        },
        {
          question: '¿Por qué el margen de beneficio nunca puede superar el 100% si hay un coste positivo?',
          answer:
            'Porque el beneficio es igual al precio de venta menos el coste. Mientras el coste sea mayor que cero, el beneficio siempre será inferior al precio de venta total.',
        },
      ],
    },
    en: {
      slug: 'profit-margin-calculator',
      url: '/en/tools/profit-margin-calculator.html',
      name: 'Profit Margin Calculator',
      shortDescription:
        'Calculate gross profit amount, profit margin percentage on sales, and markup percentage on cost.',
      seoTitle: 'Profit Margin & Markup Calculator — CalculaFácil',
      metaDescription:
        'Free online profit margin calculator. Instantly find your gross profit amount, profit margin percentage, and markup percentage from cost and selling price.',
      h1: 'Profit Margin Calculator',
      introParagraph:
        'Measure the exact profitability of your products or services. By comparing your unit cost price with your selling price, this tool calculates gross profit, profit margin as a percentage of revenue, and markup as a percentage of cost.',
      instructionsTitle: 'How to use the profit margin calculator',
      instructions: [
        'Choose your preferred display currency (EUR, USD, MXN, ARS, COP, CLP, GBP, or PKR).',
        'Enter the unit cost price (how much it costs you to produce or buy the item).',
        'Enter the selling price charged to your customer.',
        'Review your gross profit amount, profit margin percentage, and markup percentage instantly.',
      ],
      formulaTitle: 'Profit margin and markup formulas',
      formulaBlock: [
        'Profit = Selling Price − Cost Price',
        'Profit Margin (%) = (Profit / Selling Price) × 100',
        'Markup (%) = (Profit / Cost Price) × 100',
      ],
      formulaExplanation:
        'Profit margin shows what percentage of the final selling price is profit, whereas markup measures how much you increased the price above the original cost.',
      exampleTitle: 'Practical example',
      exampleText:
        'If an item costs 60.00 USD and sells for 100.00 USD: your profit is 40.00 USD. Your profit margin is 40.00% (40 / 100 × 100), and your markup on cost is 66.67% (40 / 60 × 100).',
      faqs: [
        {
          question: 'What is the difference between profit margin and markup?',
          answer:
            'Profit margin divides profit by the selling price, showing profit as a share of revenue. Markup divides profit by the cost price, showing how much was added on top of cost. For any profitable sale, the markup percentage is always higher than the profit margin percentage.',
        },
        {
          question: 'What happens if my selling price is lower than my cost price?',
          answer:
            'The calculator will display a negative profit amount (a loss) and a negative profit margin percentage, indicating you are selling below unit cost.',
        },
        {
          question: 'Should I enter prices with or without sales tax / VAT?',
          answer:
            'Always enter net amounts excluding VAT or sales tax for both cost and selling price so your margin reflects actual business revenue rather than collected taxes.',
        },
        {
          question: 'Can profit margin ever be 100%?',
          answer:
            'A 100% profit margin is only possible if the cost price is zero. Whenever your cost is greater than zero, the profit margin will be strictly less than 100%.',
        },
      ],
    },
  },

  'selling-price': {
    id: 'selling-price',
    category: 'business',
    popular: true,
    hasCurrency: true,
    relatedTools: ['profit-margin', 'discount', 'break-even'],
    es: {
      slug: 'calculadora-precio-venta',
      url: '/es/herramientas/calculadora-precio-venta.html',
      name: 'Calculadora de precio de venta',
      shortDescription:
        'Determina el precio de venta exacto que debes fijar para alcanzar tu margen de beneficio objetivo.',
      seoTitle: 'Calculadora de Precio de Venta según Margen — CalculaFácil',
      metaDescription:
        'Calcula gratis el precio de venta recomendado a partir del coste del producto y el margen de beneficio deseado. Distingue entre margen y recargo.',
      h1: 'Calculadora de precio de venta',
      introParagraph:
        'Evita el error común de sumar simplemente un porcentaje al coste cuando buscas un margen sobre las ventas. Esta herramienta calcula el precio de venta recomendado para que, tras descontar el coste del producto, obtengas exactamente el porcentaje de margen de beneficio que necesitas.',
      instructionsTitle: 'Cómo calcular el precio de venta recomendado',
      instructions: [
        'Selecciona la moneda en la que deseas mostrar los importes.',
        'Introduce el coste unitario del producto o servicio (mayor que cero).',
        'Introduce el porcentaje de margen de beneficio deseado (inferior al 100%).',
        'Obtén el precio de venta recomendado, la ganancia por unidad y el recargo equivalente.',
      ],
      formulaTitle: 'Fórmula del precio de venta',
      formulaBlock: [
        'Precio de Venta = Coste / (1 − (Margen Deseado / 100))',
        'Beneficio = Precio de Venta − Coste',
        'Recargo Equivalente (%) = (Beneficio / Coste) × 100',
      ],
      formulaExplanation:
        'Si sumas un 30% directamente a un coste de 100 EUR (vendiendo a 130 EUR), tu margen real es solo del 23,08% (30 / 130). Al dividir el coste entre (1 − 0,30), obtienes 142,86 EUR, logrando exactamente un 30% de margen sobre el precio final.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Con un coste de producto de 70,00 EUR y un margen deseado del 30%: Precio de Venta = 70 / (1 − 0,30) = 100,00 EUR. El beneficio unitario es de 30,00 EUR y el recargo sobre el coste (markup) es del 42,86%.',
      faqs: [
        {
          question: '¿Por qué no puedo introducir un margen deseado del 100% o superior?',
          answer:
            'Porque el margen de beneficio se calcula sobre el precio de venta. Si el producto tiene un coste mayor que cero, el beneficio nunca puede representar el 100% del precio de venta. Un margen del 100% implicaría dividir entre cero.',
        },
        {
          question: '¿Por qué el precio recomendado es mayor que sumar el porcentaje al coste?',
          answer:
            'Sumar un porcentaje al coste calcula un recargo (markup), no un margen de beneficio. Para que el beneficio represente, por ejemplo, el 25% del precio de venta final, debes aplicar un recargo del 33,33% sobre el coste.',
        },
        {
          question: '¿Cómo influyen los descuentos futuros en este precio?',
          answer:
            'Si planeas ofrecer descuentos promocionales más adelante, utiliza nuestra Calculadora de descuentos para comprobar cuál será tu precio final efectivo y asegurarte de no perder rentabilidad.',
        },
        {
          question: '¿Puedo usar decimales en el porcentaje de margen?',
          answer:
            'Sí, puedes introducir valores decimales como 12,5% o 37,75% para ajustar tus precios con total precisión.',
        },
      ],
    },
    en: {
      slug: 'selling-price-calculator',
      url: '/en/tools/selling-price-calculator.html',
      name: 'Selling Price Calculator',
      shortDescription:
        'Find the exact selling price needed to achieve your target gross profit margin percentage.',
      seoTitle: 'Selling Price Calculator from Target Margin — CalculaFácil',
      metaDescription:
        'Calculate the recommended selling price from your product cost and desired profit margin percentage. Includes profit amount and equivalent markup.',
      h1: 'Selling Price Calculator',
      introParagraph:
        'Avoid the common pricing mistake of confusing markup with profit margin. Enter your product cost and desired profit margin percentage to calculate the exact selling price required to hit your target margin.',
      instructionsTitle: 'How to calculate your selling price',
      instructions: [
        'Select your display currency.',
        'Enter the unit cost of your product or service (must be greater than zero).',
        'Enter your desired profit margin percentage (must be less than 100%).',
        'View the recommended selling price, profit per unit, and equivalent markup percentage.',
      ],
      formulaTitle: 'Selling price formula',
      formulaBlock: [
        'Selling Price = Cost / (1 − (Desired Margin / 100))',
        'Profit = Selling Price − Cost',
        'Equivalent Markup (%) = (Profit / Cost) × 100',
      ],
      formulaExplanation:
        'If a product costs 100 USD and you simply add 30% to sell at 130 USD, your actual profit margin is only 23.08% (30 / 130). Dividing 100 by (1 − 0.30) yields 142.86 USD, guaranteeing a true 30% profit margin.',
      exampleTitle: 'Practical example',
      exampleText:
        'If your product cost is 70.00 USD and you want a 30% profit margin: Selling Price = 70 / (1 − 0.30) = 100.00 USD. You earn 30.00 USD profit per unit, which equals a 42.86% markup on cost.',
      faqs: [
        {
          question: 'Why does the calculator reject a desired margin of 100% or higher?',
          answer:
            'Profit margin is the share of the selling price that remains after subtracting cost. Whenever cost is greater than zero, profit can never reach 100% of the selling price.',
        },
        {
          question: 'Why is the calculated price higher than adding the percentage directly to cost?',
          answer:
            'Adding a percentage directly to cost gives you a markup, not a profit margin. To keep 25% of the final selling price as profit, you must mark up the cost by 33.33%.',
        },
        {
          question: 'Does this include shipping or packaging costs?',
          answer:
            'For the most accurate pricing, include all direct unit costs—such as manufacturing, packaging, and inbound freight—inside your product cost input.',
        },
        {
          question: 'Can I enter decimal margin percentages?',
          answer:
            'Yes, decimal margins such as 18.5% or 42.25% are fully supported.',
        },
      ],
    },
  },

  'break-even': {
    id: 'break-even',
    category: 'business',
    popular: true,
    hasCurrency: true,
    relatedTools: ['profit-margin', 'selling-price', 'hourly-cost'],
    es: {
      slug: 'calculadora-punto-equilibrio',
      url: '/es/herramientas/calculadora-punto-equilibrio.html',
      name: 'Calculadora de punto de equilibrio',
      shortDescription:
        'Calcula cuántas unidades necesitas vender y qué facturación alcanzar para cubrir todos los costes fijos y variables.',
      seoTitle: 'Calculadora de Punto de Equilibrio (Break-Even) — CalculaFácil',
      metaDescription:
        'Calcula el punto de equilibrio en unidades e ingresos a partir de tus costes fijos, coste variable unitario y precio de venta. Gratis y al instante.',
      h1: 'Calculadora de punto de equilibrio',
      introParagraph:
        'El punto de equilibrio (o umbral de rentabilidad) es el volumen mínimo de ventas necesario para que tu negocio no tenga pérdidas ni ganancias. Con esta herramienta sabrás cuántas unidades completas debes vender para cubrir tanto tus costes fijos como los costes variables de cada unidad.',
      instructionsTitle: 'Cómo calcular el punto de equilibrio',
      instructions: [
        'Introduce el total de tus costes fijos del período (alquiler, suministros, salarios fijos, seguros, software).',
        'Introduce el coste variable por unidad (materia prima, embalaje, comisiones por unidad).',
        'Introduce el precio de venta por unidad (debe ser superior al coste variable unitario).',
        'Revisa las unidades redondeadas al alza necesarias para alcanzar el equilibrio, los ingresos requeridos y el margen de contribución.',
      ],
      formulaTitle: 'Fórmula del punto de equilibrio',
      formulaBlock: [
        'Margen de Contribución Unitario = Precio de Venta − Coste Variable Unitario',
        'Unidades de Equilibrio = Costes Fijos / (Precio de Venta − Coste Variable)',
        'Ingresos de Equilibrio = Unidades de Equilibrio (redondeadas al alza) × Precio de Venta',
      ],
      formulaExplanation:
        'Cada unidad vendida aporta su margen de contribución para pagar los costes fijos. Dado que en la práctica no se suelen vender fracciones de producto, las unidades se redondean al siguiente número entero completo.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Si tus costes fijos mensuales son de 3.000,00 EUR, cada producto tiene un coste variable de 15,00 EUR y se vende a 40,00 EUR: el margen de contribución es de 25,00 EUR por unidad. Necesitas vender 120 unidades (3.000 / 25), lo que equivale a 4.800,00 EUR en ingresos.',
      faqs: [
        {
          question: '¿Por qué se redondean las unidades hacia arriba al siguiente número entero?',
          answer:
            'Si el cálculo exacto da 84,2 unidades, vender 84 unidades todavía dejaría una pequeña pérdida sin cubrir. Al vender la unidad 85 se cubren por completo todos los costes fijos.',
        },
        {
          question: '¿Qué pasa si el precio de venta es igual o menor que el coste variable?',
          answer:
            'Si el precio de venta no supera el coste variable, cada venta genera cero aportación o una pérdida adicional, por lo que es matemáticamente imposible cubrir los costes fijos sin subir el precio o reducir el coste variable.',
        },
        {
          question: '¿Qué gastos debo incluir en los costes fijos?',
          answer:
            'Incluye todos los gastos que debes pagar vendas o no vendas nada: alquiler del local u oficina, sueldos fijos, cuota de autónomos, contabilidad, licencias de software y seguros.',
        },
        {
          question: '¿Cómo puedo reducir mi punto de equilibrio?',
          answer:
            'Existen tres formas directas: reducir los costes fijos, disminuir el coste variable por unidad negociando con proveedores, o incrementar el precio de venta por unidad.',
        },
      ],
    },
    en: {
      slug: 'break-even-calculator',
      url: '/en/tools/break-even-calculator.html',
      name: 'Break-Even Calculator',
      shortDescription:
        'Find how many units and how much revenue you need to cover all fixed and variable business costs.',
      seoTitle: 'Break-Even Calculator (Units & Revenue) — CalculaFácil',
      metaDescription:
        'Calculate your break-even point in units and total revenue using fixed costs, variable cost per unit, and selling price per unit.',
      h1: 'Break-Even Calculator',
      introParagraph:
        'Your break-even point is the exact sales volume where total revenue equals total costs—meaning zero net loss and zero net profit. Use this calculator to determine how many whole units you must sell to cover both fixed overhead and unit variable costs.',
      instructionsTitle: 'How to calculate your break-even point',
      instructions: [
        'Enter your total fixed costs for the period (rent, salaried payroll, insurance, software subscriptions).',
        'Enter your variable cost per unit (materials, packaging, per-unit fulfillment).',
        'Enter your selling price per unit (must be strictly higher than variable cost per unit).',
        'See the break-even units (rounded up to the next whole unit), break-even revenue, and contribution margin per unit.',
      ],
      formulaTitle: 'Break-even formulas',
      formulaBlock: [
        'Contribution Margin per Unit = Selling Price − Variable Cost',
        'Break-Even Units = Fixed Costs / (Selling Price − Variable Cost)',
        'Break-Even Revenue = Break-Even Units (rounded up) × Selling Price',
      ],
      formulaExplanation:
        'Each unit sold contributes the difference between its selling price and variable cost toward paying off fixed overhead. Because partial units cannot normally be sold, the unit count is rounded up to the next whole integer.',
      exampleTitle: 'Practical example',
      exampleText:
        'With 3,000.00 USD in monthly fixed costs, a variable cost of 15.00 USD per unit, and a selling price of 40.00 USD per unit: your contribution margin is 25.00 USD per unit. You must sell 120 units (3,000 / 25), generating 4,800.00 USD in break-even revenue.',
      faqs: [
        {
          question: 'Why does the calculator round break-even units up to the next whole number?',
          answer:
            'If the exact mathematical break-even point is 84.2 units, selling 84 units still leaves a small loss. Selling the 85th whole unit is required to fully cover fixed costs.',
        },
        {
          question: 'Why do I get an error when selling price is less than or equal to variable cost?',
          answer:
            'When selling price does not exceed variable cost, every unit sold loses money or contributes zero toward fixed costs, making break-even mathematically unreachable.',
        },
        {
          question: 'What counts as a fixed cost versus a variable cost?',
          answer:
            'Fixed costs remain constant regardless of sales volume (rent, base salaries, insurance). Variable costs scale directly with each unit sold (raw materials, unit shipping, payment gateway fees).',
        },
        {
          question: 'Can I use this for monthly or annual planning?',
          answer:
            'Yes—simply enter monthly fixed costs to find your monthly break-even volume, or annual fixed costs to find your annual break-even volume.',
        },
      ],
    },
  },

  'hourly-cost': {
    id: 'hourly-cost',
    category: 'business',
    popular: false,
    hasCurrency: true,
    relatedTools: ['salary', 'profit-margin', 'break-even'],
    es: {
      slug: 'calculadora-coste-por-hora',
      url: '/es/herramientas/calculadora-coste-por-hora.html',
      name: 'Calculadora de coste por hora',
      shortDescription:
        'Divide el coste total de un proyecto, servicio o empleado entre las horas trabajadas para conocer el coste horario y diario.',
      seoTitle: 'Calculadora de Coste por Hora y Jornada — CalculaFácil',
      metaDescription:
        'Calcula fácilmente el coste por hora y el coste por día a partir del coste total y las horas empleadas. Ideal para autónomos, proyectos y empresas.',
      h1: 'Calculadora de coste por hora',
      introParagraph:
        'Determina cuánto cuesta realmente cada hora de trabajo, operación o proyecto. Introduce el gasto o presupuesto total y el número de horas invertidas para conocer el coste por hora, el coste por jornada diaria y el coste por minuto.',
      instructionsTitle: 'Cómo calcular el coste por hora',
      instructions: [
        'Elige la moneda de visualización.',
        'Introduce el coste total del proyecto, servicio o período.',
        'Introduce el número total de horas dedicadas.',
        'Opcionalmente, ajusta las horas por jornada diaria (por defecto 8 horas) para ver el coste por día.',
      ],
      formulaTitle: 'Fórmula del coste por hora',
      formulaBlock: [
        'Coste por Hora = Coste Total / Horas Totales',
        'Coste por Día = Coste por Hora × Horas por Día',
      ],
      formulaExplanation:
        'Dividir todos los gastos directos e indirectos entre las horas efectivas te permite presupuestar futuros trabajos sin subestimar tus costes operativos.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Si un proyecto supone un coste total de 2.400,00 EUR y requiere 160 horas de trabajo (con jornadas de 8 horas): el coste por hora es de 15,00 EUR y el coste por jornada diaria es de 120,00 EUR.',
      faqs: [
        {
          question: '¿Para qué sirve conocer el coste por hora en un negocio?',
          answer:
            'Permite fijar tarifas mínimas rentables para clientes, evaluar si un proyecto fue eficiente y comparar el coste real de distintos equipos o proveedores.',
        },
        {
          question: '¿Puedo introducir fracciones de hora (decimales)?',
          answer:
            'Sí. Por ejemplo, para 7 horas y 30 minutos puedes escribir 7,5 horas.',
        },
        {
          question: '¿Cuál es la diferencia entre horas totales y horas facturables?',
          answer:
            'Si eres autónomo o agencia, te recomendamos dividir tus costes totales mensuales entre las horas realmente facturables a clientes, ya que las horas administrativas también deben cubrirse.',
        },
        {
          question: '¿Cómo paso del coste por hora al precio de venta por hora?',
          answer:
            'Una vez que conozcas tu coste por hora aquí, puedes llevar ese valor a nuestra Calculadora de precio de venta para añadir el margen de beneficio que deseas obtener.',
        },
      ],
    },
    en: {
      slug: 'hourly-cost-calculator',
      url: '/en/tools/hourly-cost-calculator.html',
      name: 'Hourly Cost Calculator',
      shortDescription:
        'Divide total project, operational, or labor cost by total hours to calculate exact hourly and daily cost.',
      seoTitle: 'Hourly Cost & Daily Rate Calculator — CalculaFácil',
      metaDescription:
        'Calculate your cost per hour and cost per day from total cost and total hours worked. Built for freelancers, contractors, and project managers.',
      h1: 'Hourly Cost Calculator',
      introParagraph:
        'Find out how much each hour of work, equipment runtime, or project delivery actually costs. Enter your total cost and total hours to calculate the exact hourly cost, daily cost, and cost per minute.',
      instructionsTitle: 'How to calculate hourly cost',
      instructions: [
        'Select your preferred display currency.',
        'Enter the total cost of the project, employee, or period.',
        'Enter the total number of hours worked.',
        'Optionally adjust the working hours per day (default is 8 hours) to see the daily cost.',
      ],
      formulaTitle: 'Hourly cost formula',
      formulaBlock: [
        'Hourly Cost = Total Cost / Total Hours',
        'Daily Cost = Hourly Cost × Hours per Day',
      ],
      formulaExplanation:
        'Dividing total overhead and direct expenses by effective hours gives you a reliable baseline for quoting client work and tracking operational efficiency.',
      exampleTitle: 'Practical example',
      exampleText:
        'If a project costs 2,400.00 USD in total and takes 160 hours (at 8 hours per day): your hourly cost is 15.00 USD/hour and your daily cost is 120.00 USD/day.',
      faqs: [
        {
          question: 'Why should I track hourly cost?',
          answer:
            'Knowing your true hourly cost ensures you never price client projects or service contracts below what it costs you to deliver them.',
        },
        {
          question: 'Can I enter decimal hours?',
          answer:
            'Yes. For example, 37 hours and 30 minutes can be entered as 37.5 hours.',
        },
        {
          question: 'Should I use total hours or billable hours?',
          answer:
            'For freelancers and agencies, dividing total monthly expenses by billable hours gives your true minimum hourly rate required to cover non-billable admin time.',
        },
        {
          question: 'How do I add a profit margin to my hourly cost?',
          answer:
            'Take the hourly cost calculated here and enter it into our Selling Price Calculator along with your desired profit margin percentage.',
        },
      ],
    },
  },

  commission: {
    id: 'commission',
    category: 'business',
    popular: false,
    hasCurrency: true,
    relatedTools: ['discount', 'profit-margin', 'salary'],
    es: {
      slug: 'calculadora-comisiones',
      url: '/es/herramientas/calculadora-comisiones.html',
      name: 'Calculadora de comisiones',
      shortDescription:
        'Calcula el importe exacto de una comisión comercial, el neto tras descontarla y el total sumando la comisión.',
      seoTitle: 'Calculadora de Comisiones de Venta — CalculaFácil',
      metaDescription:
        'Calcula gratis comisiones sobre ventas o servicios. Obtén el importe de la comisión, el neto resultante y el total con comisión incluida.',
      h1: 'Calculadora de comisiones',
      introParagraph:
        'Calcula de forma rápida cuánto corresponde pagar o cobrar en concepto de comisión comercial, inmobiliaria o de plataforma. La herramienta muestra tanto el importe de la comisión como el total con comisión añadida y el importe neto si la comisión se descuenta de la venta.',
      instructionsTitle: 'Cómo usar la calculadora de comisiones',
      instructions: [
        'Selecciona la moneda en la que realizas la operación.',
        'Introduce el importe total de las ventas o de la transacción.',
        'Introduce el porcentaje de comisión aplicable (por ejemplo, 5% o 12,5%).',
        'Consulta el importe de la comisión, el neto para el vendedor y el total si se repercute al cliente.',
      ],
      formulaTitle: 'Fórmula de la comisión',
      formulaBlock: [
        'Comisión = Ventas × Porcentaje de Comisión / 100',
        'Total incluyendo comisión = Ventas + Comisión',
        'Neto descontando comisión = Ventas − Comisión',
      ],
      formulaExplanation:
        'Dependiendo del acuerdo comercial, la comisión puede sumarse al importe base (por ejemplo, honorarios añadidos al comprador) o restarse del ingreso bruto (como en pasarelas de pago o marketplaces). Mostramos ambos valores para mayor claridad.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Para unas ventas totales de 5.000,00 EUR con una comisión del 6%: el importe de la comisión es de 300,00 EUR. El total sumando comisión es 5.300,00 EUR, y el importe neto si se descuenta la comisión es 4.700,00 EUR.',
      faqs: [
        {
          question: '¿Sirve para calcular comisiones inmobiliarias o de ventas?',
          answer:
            'Sí, funciona para cualquier operación basada en porcentaje: agentes comerciales, agencias inmobiliarias, afiliados o comisiones de plataformas digitales.',
        },
        {
          question: '¿Cuál es la diferencia entre total con comisión y neto tras comisión?',
          answer:
            'El total con comisión suma los honorarios al importe base. El neto tras comisión muestra cuánto recibe el vendedor cuando la plataforma o intermediario retiene su comisión del pago.',
        },
        {
          question: '¿Puedo calcular porcentajes con decimales?',
          answer:
            'Por supuesto. Puedes introducir tasas como 2,9% o 4,75% habituales en pasarelas de pago y contratos comerciales.',
        },
        {
          question: '¿Qué ocurre si introduzco un 0% de comisión?',
          answer:
            'La comisión será de 0,00 y tanto el importe neto como el total coincidirán exactamente con el volumen de ventas introducido.',
        },
      ],
    },
    en: {
      slug: 'commission-calculator',
      url: '/en/tools/commission-calculator.html',
      name: 'Commission Calculator',
      shortDescription:
        'Calculate sales commission amount, total including commission, and net proceeds after deducting commission.',
      seoTitle: 'Sales Commission Calculator — CalculaFácil',
      metaDescription:
        'Free online commission calculator. Instantly find commission amount, net sales after commission, and total amount including commission.',
      h1: 'Commission Calculator',
      introParagraph:
        'Quickly determine sales commissions for sales reps, real estate transactions, affiliate payouts, or marketplace fees. View the exact commission amount alongside both the total with commission added and the net payout with commission deducted.',
      instructionsTitle: 'How to use the commission calculator',
      instructions: [
        'Select your display currency.',
        'Enter the total sales or transaction amount.',
        'Enter the commission rate percentage (e.g., 5% or 12.5%).',
        'View the commission amount, total including commission, and net amount after commission.',
      ],
      formulaTitle: 'Commission formula',
      formulaBlock: [
        'Commission = Sales × Commission Rate / 100',
        'Total Including Commission = Sales + Commission',
        'Net After Commission = Sales − Commission',
      ],
      formulaExplanation:
        'Depending on your contract, commission may be paid out from gross sales (reducing net proceeds) or added on top of a base price as a service fee. Both figures are calculated automatically.',
      exampleTitle: 'Practical example',
      exampleText:
        'On 5,000.00 USD in total sales at a 6% commission rate: the commission amount is 300.00 USD. Total including commission is 5,300.00 USD, and net proceeds after deducting commission are 4,700.00 USD.',
      faqs: [
        {
          question: 'Can I use this for real estate, affiliate, or sales rep commissions?',
          answer:
            'Yes, it works for any percentage-based commission structure across sales, real estate, freelance marketplaces, and payment processors.',
        },
        {
          question: 'When should I look at Total Including Commission vs. Net After Commission?',
          answer:
            'Use Total Including Commission when a buyer pays a fee on top of the base price. Use Net After Commission when a broker or platform deducts its fee from your gross sale.',
        },
        {
          question: 'Are decimal commission rates supported?',
          answer:
            'Yes, you can enter precise decimal rates such as 1.75%, 2.9%, or 8.25%.',
        },
        {
          question: 'How do I add a base salary to my sales commission?',
          answer:
            'Once you know your periodic commission amount, enter it into the Additional Income / Bonus field in our Salary Calculator.',
        },
      ],
    },
  },

  discount: {
    id: 'discount',
    category: 'finance',
    popular: true,
    hasCurrency: true,
    relatedTools: ['selling-price', 'profit-margin', 'commission'],
    es: {
      slug: 'calculadora-descuentos',
      url: '/es/herramientas/calculadora-descuentos.html',
      name: 'Calculadora de descuentos',
      shortDescription:
        'Averigua cuánto dinero ahorras y cuál es el precio final tras aplicar cualquier porcentaje de descuento.',
      seoTitle: 'Calculadora de Descuentos y Precio Final — CalculaFácil',
      metaDescription:
        'Calcula gratis el precio final de un producto y el ahorro exacto al aplicar un porcentaje de descuento. Rápida, clara y sin registros.',
      h1: 'Calculadora de descuentos',
      introParagraph:
        'Comprueba al instante cuánto vas a pagar en rebajas, promociones comerciales o presupuestos con descuento. Solo tienes que indicar el precio original y el porcentaje de rebaja para conocer el ahorro exacto y el importe final.',
      instructionsTitle: 'Cómo calcular un descuento',
      instructions: [
        'Selecciona tu moneda de visualización.',
        'Introduce el precio original del artículo o servicio antes del descuento.',
        'Introduce el porcentaje de descuento (entre 0% y 100%).',
        'Obtén de inmediato el dinero ahorrado, el precio final a pagar y el porcentaje ahorrado.',
      ],
      formulaTitle: 'Fórmula del descuento',
      formulaBlock: [
        'Importe del Descuento = Precio Original × Porcentaje de Descuento / 100',
        'Precio Final = Precio Original − Importe del Descuento',
      ],
      formulaExplanation:
        'Multiplicamos el precio inicial por el porcentaje dividido entre 100 para obtener la rebaja monetaria y luego la restamos del precio original.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Un abrigo cuesta originalmente 120,00 EUR y tiene un 25% de descuento: el ahorro es de 30,00 EUR (120 × 25 / 100) y el precio final a pagar es de 90,00 EUR.',
      faqs: [
        {
          question: '¿Cómo se calcula mentalmente un descuento rápido?',
          answer:
            'Un truco sencillo es calcular primero el 10% (moviendo la coma decimal un lugar a la izquierda) y multiplicar a partir de ahí. Por ejemplo, el 10% de 80 es 8, así que el 20% es 16 y el 5% es 4.',
        },
        {
          question: '¿Puedo introducir un porcentaje de descuento con decimales?',
          answer:
            'Sí, admite cualquier valor entre 0% y 100%, incluyendo decimales como 12,5% o 17,25%.',
        },
        {
          question: '¿Cómo afecta un descuento al margen de beneficio de mi tienda?',
          answer:
            'Un descuento reduce directamente tu precio de venta mientras el coste del producto se mantiene igual. Puedes introducir el Precio Final obtenido aquí dentro de la Calculadora de margen de beneficio para verificar si sigues teniendo ganancias.',
        },
        {
          question: '¿Es lo mismo dos descuentos sucesivos del 10% que un descuento del 20%?',
          answer:
            'No. Si aplicas un 10% a 100 EUR pasas a 90 EUR; un segundo 10% sobre 90 EUR descuenta 9 EUR adicionales, dejando el precio en 81 EUR (lo que equivale a un descuento total del 19%, no del 20%).',
        },
      ],
    },
    en: {
      slug: 'discount-calculator',
      url: '/en/tools/discount-calculator.html',
      name: 'Discount Calculator',
      shortDescription:
        'Calculate the exact discount amount, final sale price, and percentage saved on any purchase or quote.',
      seoTitle: 'Discount Calculator (Sale Price & Savings) — CalculaFácil',
      metaDescription:
        'Free discount calculator. Enter the original price and discount percentage to instantly see how much you save and the final price to pay.',
      h1: 'Discount Calculator',
      introParagraph:
        'Find out exactly how much money you save and what you will pay after a percentage discount. Ideal for everyday shopping, promotional pricing, and client quotes.',
      instructionsTitle: 'How to calculate a discount',
      instructions: [
        'Choose your display currency.',
        'Enter the original price before discount.',
        'Enter the discount percentage (between 0% and 100%).',
        'See the discount amount saved, the final price, and the percentage saved right away.',
      ],
      formulaTitle: 'Discount formula',
      formulaBlock: [
        'Discount Amount = Original Price × Discount Rate / 100',
        'Final Price = Original Price − Discount Amount',
      ],
      formulaExplanation:
        'The discount amount is found by multiplying the original price by the discount percentage divided by 100, and then subtracting that savings from the original price.',
      exampleTitle: 'Practical example',
      exampleText:
        'If an item originally costs 120.00 USD with a 25% discount: you save 30.00 USD (120 × 25 / 100) and pay a final price of 90.00 USD.',
      faqs: [
        {
          question: 'How does offering a discount affect my business profit margin?',
          answer:
            'A discount lowers your effective selling price while your product cost stays fixed. Take the Final Price calculated here and test it in our Profit Margin Calculator to ensure the sale remains profitable.',
        },
        {
          question: 'Can I enter decimal discount percentages?',
          answer:
            'Yes, any value from 0% to 100% including decimals like 7.5% or 15.25% is supported.',
        },
        {
          question: 'Are two consecutive 10% discounts equal to a 20% discount?',
          answer:
            'No. Taking 10% off 100 USD gives 90 USD, and taking another 10% off 90 USD subtracts 9 USD, leaving 81 USD—an effective total discount of 19%, not 20%.',
        },
        {
          question: 'Does currency selection change the numerical math?',
          answer:
            'No, selecting a currency only formats how the amounts are displayed and never performs foreign exchange conversion.',
        },
      ],
    },
  },

  'word-counter': {
    id: 'word-counter',
    category: 'text',
    popular: true,
    hasCurrency: false,
    relatedTools: ['character-counter', 'hourly-cost', 'commission'],
    es: {
      slug: 'contador-de-palabras',
      url: '/es/herramientas/contador-de-palabras.html',
      name: 'Contador de palabras',
      shortDescription:
        'Cuenta palabras, caracteres con y sin espacios, frases y párrafos en tiempo real mientras escribes o pegas tu texto.',
      seoTitle: 'Contador de Palabras, Caracteres y Párrafos Online — CalculaFácil',
      metaDescription:
        'Contador de palabras y caracteres en tiempo real. Analiza palabras, caracteres sin espacios, frases y párrafos gratis desde tu navegador.',
      h1: 'Contador de palabras',
      introParagraph:
        'Analiza la longitud y estructura de tus textos al instante. Mientras escribes o pegas contenido, la herramienta cuenta las palabras, los caracteres totales, los caracteres sin espacios, las oraciones y los párrafos directamente en tu navegador sin enviar tu texto a ningún servidor.',
      instructionsTitle: 'Cómo usar el contador de palabras',
      instructions: [
        'Escribe o pega tu texto en el área de edición principal.',
        'Observa cómo se actualizan en tiempo real las palabras, caracteres, frases y párrafos.',
        'Usa el botón «Copiar resultados» para guardar el resumen estadístico en tu portapapeles.',
        'Pulsa «Limpiar texto» cuando quieras vaciar el editor y empezar de nuevo.',
      ],
      formulaTitle: 'Criterios de conteo de texto',
      formulaBlock: [
        'Palabras = Segmentos de texto separados por uno o más espacios o saltos de línea',
        'Caracteres (sin espacios) = Total de caracteres − Espacios, tabulaciones y saltos de línea',
        'Párrafos = Bloques de texto no vacíos separados por saltos de línea',
      ],
      formulaExplanation:
        'El análisis se ejecuta localmente en tu dispositivo en tiempo real, garantizando total privacidad para tus artículos, trabajos académicos o documentos profesionales.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'El texto «Calcula fácil. Herramientas gratis para tu día a día.» contiene 9 palabras, 53 caracteres con espacios, 45 caracteres sin espacios, 2 frases y 1 párrafo.',
      faqs: [
        {
          question: '¿Se guarda o envía mi texto a algún servidor externo?',
          answer:
            'No. Todo el conteo se procesa al 100% dentro de tu propio navegador mediante JavaScript local. Tus textos nunca salen de tu dispositivo.',
        },
        {
          question: '¿Cómo se cuentan las palabras con guiones o números?',
          answer:
            'Cualquier secuencia continua de caracteres separada por espacios se contabiliza como una palabra, de forma consistente con los procesadores de texto habituales.',
        },
        {
          question: '¿Cómo se calcula el tiempo estimado de lectura?',
          answer:
            'Se estima sobre una velocidad media de lectura silenciosa de 200 palabras por minuto.',
        },
        {
          question: '¿Qué hago si necesito controlar un límite máximo de caracteres?',
          answer:
            'Puedes abrir nuestra herramienta hermana, el Contador de caracteres, que incluye un límite configurable e indicador visual de exceso.',
        },
      ],
    },
    en: {
      slug: 'word-counter',
      url: '/en/tools/word-counter.html',
      name: 'Word Counter',
      shortDescription:
        'Count words, total characters, characters excluding spaces, sentences, and paragraphs live as you type.',
      seoTitle: 'Online Word Counter & Paragraph Analyzer — CalculaFácil',
      metaDescription:
        'Free live word counter. Instantly count words, characters with and without spaces, sentences, and paragraphs right in your browser.',
      h1: 'Word Counter',
      introParagraph:
        'Check the length and structure of essays, articles, reports, and social posts in real time. As you type or paste text, this tool counts words, total characters, characters excluding spaces, sentences, and paragraphs completely privately in your browser.',
      instructionsTitle: 'How to use the word counter',
      instructions: [
        'Type or paste your text into the text area below.',
        'Watch the word, character, sentence, and paragraph counts update automatically as you type.',
        'Click "Copy results" to copy a formatted summary of your text counts.',
        'Click "Clear text" to reset the editor.',
      ],
      formulaTitle: 'How text metrics are counted',
      formulaBlock: [
        'Words = Non-empty text tokens separated by whitespace or line breaks',
        'Characters (no spaces) = Total characters − All spaces, tabs, and newlines',
        'Paragraphs = Non-empty text blocks separated by line breaks',
      ],
      formulaExplanation:
        'All text processing happens locally inside your web browser. None of your text is ever uploaded or stored on an external server.',
      exampleTitle: 'Practical example',
      exampleText:
        'The text "Calculate easily. Free tools for everyday life." has 7 words, 47 characters including spaces, 41 characters excluding spaces, 2 sentences, and 1 paragraph.',
      faqs: [
        {
          question: 'Is the text I paste into this word counter kept private?',
          answer:
            'Yes. The word counter runs entirely in your browser using client-side JavaScript. Your text is never transmitted over the network.',
        },
        {
          question: 'Does the counter update while I type?',
          answer:
            'Yes, every metric updates instantaneously on each keystroke or paste event.',
        },
        {
          question: 'How is reading time estimated?',
          answer:
            'Estimated reading time is based on a standard adult silent reading speed of 200 words per minute.',
        },
        {
          question: 'Where can I check a strict character limit for SEO or social media?',
          answer:
            'Use our Character Counter tool, which lets you set a custom character limit and highlights when you exceed it.',
        },
      ],
    },
  },

  'character-counter': {
    id: 'character-counter',
    category: 'text',
    popular: false,
    hasCurrency: false,
    relatedTools: ['word-counter', 'discount', 'commission'],
    es: {
      slug: 'contador-de-caracteres',
      url: '/es/herramientas/contador-de-caracteres.html',
      name: 'Contador de caracteres',
      shortDescription:
        'Controla en vivo el número de caracteres con y sin espacios, palabras y caracteres restantes según tu propio límite.',
      seoTitle: 'Contador de Caracteres con Límite Personalizado — CalculaFácil',
      metaDescription:
        'Cuenta caracteres con y sin espacios en tiempo real y define un límite personalizado para SEO, redes sociales o formularios.',
      h1: 'Contador de caracteres',
      introParagraph:
        'Ideal para redactar meta descripciones SEO, publicaciones en redes sociales, mensajes SMS o formularios con longitud máxima. Define tu propio límite de caracteres y comprueba en tiempo real cuántos caracteres llevas y cuántos te quedan disponibles.',
      instructionsTitle: 'Cómo usar el contador de caracteres',
      instructions: [
        'Establece el límite máximo de caracteres en el campo correspondiente o elige uno de los límites rápidos (155 SEO, 160 SMS, 280 Post).',
        'Escribe o pega tu texto en el recuadro principal.',
        'Revisa los caracteres totales, los caracteres sin espacios, las palabras y los caracteres restantes.',
        'Si superas el límite configurado, verás un aviso claro indicando por cuántos caracteres te has excedido.',
      ],
      formulaTitle: 'Cálculo del límite de caracteres',
      formulaBlock: [
        'Caracteres Restantes = Límite Definido − Caracteres Totales (con espacios)',
        'Porcentaje Utilizado = (Caracteres Totales / Límite Definido) × 100',
      ],
      formulaExplanation:
        'La mayoría de las plataformas web, motores de búsqueda y sistemas SMS contabilizan todos los caracteres incluyendo los espacios en blanco y signos de puntuación.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Si configuras un límite de 155 caracteres para una meta descripción SEO y escribes un texto de 135 caracteres, el indicador mostrará 20 caracteres restantes (87,1% utilizado) dentro del rango permitido.',
      faqs: [
        {
          question: '¿Los espacios cuentan como caracteres en SEO y redes sociales?',
          answer:
            'Sí. Tanto Google en los títulos y meta descripciones como las redes sociales y los mensajes SMS cuentan cada espacio en blanco como un carácter más. Aun así, también mostramos el dato sin espacios por si lo necesitas.',
        },
        {
          question: '¿Cuáles son los límites de caracteres más habituales?',
          answer:
            'Un título SEO suele recomendarse entre 50 y 60 caracteres; una meta descripción SEO entre 120 y 155 caracteres; un mensaje SMS estándar tiene 160 caracteres; y una publicación breve en X (Twitter) admite 280 caracteres.',
        },
        {
          question: '¿Qué pasa cuando supero el límite de caracteres?',
          answer:
            'El contador no borra ni corta tu texto para que no pierdas información, pero muestra una alerta clara y un número negativo indicando exactamente cuántos caracteres debes recortar.',
        },
        {
          question: '¿Es seguro pegar borradores confidenciales aquí?',
          answer:
            'Totalmente seguro: el conteo se realiza únicamente en la memoria de tu navegador sin enviar datos a ningún servidor.',
        },
      ],
    },
    en: {
      slug: 'character-counter',
      url: '/en/tools/character-counter.html',
      name: 'Character Counter',
      shortDescription:
        'Track live character count, characters without spaces, word count, and remaining characters against a custom limit.',
      seoTitle: 'Live Character Counter with Custom Limit — CalculaFácil',
      metaDescription:
        'Free online character counter. Track characters with and without spaces, word count, and remaining characters with a customizable limit alert.',
      h1: 'Character Counter',
      introParagraph:
        'Write concise SEO titles, meta descriptions, SMS messages, and social media posts without guessing lengths. Set any custom character limit—or pick a quick preset—and see your remaining characters and visual status update as you type.',
      instructionsTitle: 'How to use the character counter',
      instructions: [
        'Enter your target character limit or select a quick preset (60 SEO Title, 155 Meta Description, 160 SMS, 280 Social Post).',
        'Type or paste your text into the editor.',
        'Monitor total characters, characters excluding spaces, word count, and remaining characters.',
        'If your text exceeds the limit, a clear warning displays how many characters you are over.',
      ],
      formulaTitle: 'Character limit calculation',
      formulaBlock: [
        'Remaining Characters = Target Limit − Total Characters (including spaces)',
        'Limit Usage (%) = (Total Characters / Target Limit) × 100',
      ],
      formulaExplanation:
        'Search snippets, social platforms, and form fields count spaces and punctuation toward maximum length limits. We also display characters excluding spaces for academic or translation workflows.',
      exampleTitle: 'Practical example',
      exampleText:
        'With a 155-character limit set for an SEO meta description and a draft of 135 characters, the tool shows 20 characters remaining (87.1% used).',
      faqs: [
        {
          question: 'Do spaces count as characters?',
          answer:
            'Yes, in almost all digital platforms, form inputs, and SMS systems, every space and punctuation mark counts as one character. We show both total characters and characters excluding spaces.',
        },
        {
          question: 'What are standard character limits for SEO and social media?',
          answer:
            'SEO page titles typically fit best within 50–60 characters, meta descriptions within 120–155 characters, standard SMS messages within 160 characters, and standard X posts within 280 characters.',
        },
        {
          question: 'Does the tool truncate my text if I go over the limit?',
          answer:
            'No, your text is never cut off. Instead, the counter highlights the limit status and shows a negative remaining count so you can edit comfortably.',
        },
        {
          question: 'Is my text stored anywhere?',
          answer:
            'No. Everything runs locally in your browser with zero server communication.',
        },
      ],
    },
  },

  'bank-loan': {
    id: 'bank-loan',
    category: 'finance',
    popular: true,
    hasCurrency: true,
    relatedTools: ['salary', 'hourly-cost', 'discount'],
    es: {
      slug: 'calculadora-prestamos',
      url: '/es/herramientas/calculadora-prestamos.html',
      name: 'Calculadora de préstamos bancarios',
      shortDescription:
        'Calcula la cuota mensual fija (EMI), el total de intereses, el coste total con comisión y la tabla de amortización mes a mes.',
      seoTitle: 'Calculadora de Préstamos Bancarios y Cuota Mensual — CalculaFácil',
      metaDescription:
        'Simula la cuota mensual de tu préstamo bancario con el sistema de saldo decreciente (amortización francesa), intereses totales y cuadro de amortización.',
      h1: 'Calculadora de préstamos bancarios',
      introParagraph:
        'Estima la cuota mensual fija (EMI) de un préstamo personal, comercial o hipotecario utilizando la fórmula financiera estándar sobre saldo pendiente decreciente (sistema de amortización francés). Incluye resumen de intereses, comisión de apertura opcional y tabla de amortización mensual completa.',
      instructionsTitle: 'Cómo calcular la cuota de tu préstamo',
      instructions: [
        'Selecciona la moneda de visualización.',
        'Introduce el importe principal del préstamo que deseas solicitar.',
        'Indica el tipo de interés anual nominal (%) — admite 0% para préstamos sin intereses.',
        'Introduce el plazo de devolución y elige si está expresado en meses o en años.',
        'Opcionalmente, añade el importe de la comisión de apertura o estudio para conocer el coste total estimado.',
        'Despliega la tabla de amortización mensual para ver cómo evoluciona el capital y los intereses en cada cuota.',
      ],
      formulaTitle: 'Fórmula de cuota fija sobre saldo decreciente (EMI)',
      formulaBlock: [
        'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
        'Si el tipo de interés es 0%: EMI = P / n',
        'Donde: P = Capital principal | r = Interés mensual (Anual / 12 / 100) | n = Número total de meses',
      ],
      formulaExplanation:
        'A diferencia del interés plano, en el sistema de saldo decreciente los intereses de cada mes se calculan únicamente sobre el capital pendiente de devolución. Al principio del préstamo pagas más intereses y menos capital; hacia el final, la mayor parte de la cuota amortiza capital.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Para un préstamo de 10.000,00 EUR al 6% de interés anual durante 3 años (36 meses) y una comisión de apertura de 100,00 EUR: la cuota mensual (EMI) es de 304,22 EUR, el total de intereses es de 951,90 EUR, la devolución total es de 10.951,90 EUR y el coste total estimado con comisión es de 11.051,90 EUR.',
      faqs: [
        {
          question: '¿Qué diferencia hay entre el interés sobre saldo decreciente y el interés plano?',
          answer:
            'En el interés sobre saldo decreciente (el estándar bancario habitual), cada mes pagas intereses solo sobre la deuda que aún te queda por devolver. En el interés plano se cobran intereses sobre el importe inicial durante toda la vida del préstamo, lo que resulta mucho más costoso.',
        },
        {
          question: '¿Por qué la cuota real de mi banco puede variar respecto a este cálculo?',
          answer:
            'Esta calculadora proporciona una estimación matemática independiente y NO constituye una oferta ni cotización oficial bancaria. Los pagos reales pueden variar debido a comisiones bancarias adicionales, seguros vinculados, impuestos locales, redondeos de días exactos o revisiones de tipos variables.',
        },
        {
          question: '¿Funciona para préstamos al 0% de interés?',
          answer:
            'Sí. Si introduces un 0% de interés anual, la calculadora aplica automáticamente la fórmula lineal (Capital / Número de meses) sin errores de división.',
        },
        {
          question: '¿Qué muestra la tabla de amortización mensual?',
          answer:
            'Muestra mes por mes el saldo inicial, la cuota pagada, qué parte corresponde a intereses, qué parte reduce tu deuda (capital amortizado) y el saldo pendiente tras cada pago hasta llegar a cero.',
        },
      ],
    },
    en: {
      slug: 'bank-loan-calculator',
      url: '/en/tools/bank-loan-calculator.html',
      name: 'Bank Loan / EMI Calculator',
      shortDescription:
        'Calculate fixed monthly loan installments (EMI), total interest payable, total cost with fees, and a full monthly amortization schedule.',
      seoTitle: 'Bank Loan & Monthly EMI Calculator — CalculaFácil',
      metaDescription:
        'Accurate reducing-balance bank loan EMI calculator. Compute monthly payment, total interest, optional processing fee, and full monthly amortization table.',
      h1: 'Bank Loan / EMI Calculator',
      introParagraph:
        'Calculate your fixed monthly loan installment (Equated Monthly Installment / EMI) using the standard reducing-balance amortization formula. Review total interest payable, optional processing fees, and inspect the complete month-by-month repayment schedule.',
      instructionsTitle: 'How to use the bank loan calculator',
      instructions: [
        'Select your preferred display currency.',
        'Enter the principal loan amount.',
        'Enter the annual interest rate (%) — supports 0% for interest-free financing.',
        'Enter the loan duration and choose either months or years.',
        'Optionally enter any upfront processing or origination fee.',
        'Open the monthly amortization table below the summary to inspect every installment.',
      ],
      formulaTitle: 'Reducing-balance EMI formula',
      formulaBlock: [
        'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
        'If interest rate is 0%: EMI = P / n',
        'Where: P = Principal loan amount | r = Monthly interest rate (Annual / 12 / 100) | n = Total monthly installments',
      ],
      formulaExplanation:
        'Unlike flat-rate interest (which charges interest on the original principal every month), reducing-balance loans calculate monthly interest only on the remaining unpaid principal balance.',
      exampleTitle: 'Practical example',
      exampleText:
        'For a 10,000.00 USD loan at 6% annual interest over 3 years (36 months) with a 100.00 USD processing fee: your monthly payment (EMI) is 304.22 USD, total interest payable is 951.90 USD, total loan repayment is 10,951.90 USD, and total estimated cost including fee is 11,051.90 USD.',
      faqs: [
        {
          question: 'What is the difference between reducing-balance interest and flat interest?',
          answer:
            'In a reducing-balance loan, interest each month is charged only on the remaining principal balance. In a flat-rate loan, interest is charged on the full original loan amount every month regardless of how much principal you have already repaid.',
        },
        {
          question: 'Is this an official bank loan quotation?',
          answer:
            'No. This calculator provides an independent mathematical estimate and is NOT an official bank quotation. Actual bank payments may differ due to bank fees, credit insurance, local taxes, day-count conventions, rate adjustments, and lender-specific terms.',
        },
        {
          question: 'Does the calculator handle 0% interest loans?',
          answer:
            'Yes. When you enter 0% annual interest, the tool automatically divides the principal evenly across the total number of monthly installments (EMI = P / n).',
        },
        {
          question: 'What is included in the monthly amortization schedule?',
          answer:
            'For every month of the loan, the table displays the opening balance, monthly payment, principal paid, interest paid, and remaining balance down to zero.',
        },
      ],
    },
  },

  salary: {
    id: 'salary',
    category: 'finance',
    popular: true,
    hasCurrency: true,
    relatedTools: ['hourly-cost', 'bank-loan', 'commission'],
    es: {
      slug: 'calculadora-salario',
      url: '/es/herramientas/calculadora-salario.html',
      name: 'Calculadora de salario',
      shortDescription:
        'Convierte tu sueldo entre salario anual, mensual, quincenal, semanal, diario y por hora con ingresos extra y deducciones manuales.',
      seoTitle: 'Calculadora de Salario (Anual, Mensual y por Hora) — CalculaFácil',
      metaDescription:
        'Convierte tu salario entre pago por hora, diario, semanal, quincenal, mensual y anual. Añade ingresos extra y deducciones manuales en tu moneda.',
      h1: 'Calculadora de salario',
      introParagraph:
        'Convierte con precisión cualquier sueldo entre diferentes frecuencias de pago (por hora, diario, semanal, cada dos semanas, mensual y anual) según tu jornada laboral real. Puedes añadir ingresos adicionales o bonificaciones e introducir tus propias deducciones manuales para estimar el importe neto en cada período.',
      instructionsTitle: 'Cómo usar la calculadora de salario',
      instructions: [
        'Selecciona tu moneda de visualización.',
        'Introduce el importe de tu salario bruto base y elige la frecuencia con la que lo cobras (por hora, diario, semanal, quincenal/bisemanal, mensual o anual).',
        'Indica cuántas horas trabajas al día (por ejemplo, 8) y cuántos días trabajas a la semana (por ejemplo, 5).',
        'Opcionalmente, introduce ingresos adicionales (bonos, pluses) y deducciones manuales correspondientes al mismo período seleccionado.',
        'Consulta la tabla comparativa con el salario bruto, ingresos extra, deducciones y salario neto estimado para todos los períodos.',
      ],
      formulaTitle: 'Fórmulas y supuestos de conversión salarial',
      formulaBlock: [
        'Semanas por año = 52 | Quincenas (bisemanal) por año = 26 | Meses por año = 12',
        'Días laborables al año = Días por semana × 52',
        'Horas laborables al año = Horas por día × Días por semana × 52',
        'Salario Neto Estimado = Salario Bruto + Ingresos Adicionales − Deducciones Manuales',
      ],
      formulaExplanation:
        'Importante sobre impuestos y cotizaciones: esta herramienta no aplica tipos impositivos automáticos ni inventados, ya que las retenciones dependen del país, comunidad o estado, situación familiar y convenio colectivo. Introduce tus deducciones manualmente para obtener una estimación personalizada.',
      exampleTitle: 'Ejemplo práctico',
      exampleText:
        'Un salario mensual bruto de 2.500,00 EUR (trabajando 8 horas al día, 5 días por semana, equivalentes a 2.080 horas al año), con 100,00 EUR mensuales de plus y 450,00 EUR mensuales de deducciones manuales: equivale a 30.000,00 EUR brutos anuales (14,42 EUR brutos/hora) y un salario neto estimado de 2.150,00 EUR al mes (25.800,00 EUR netos al año).',
      faqs: [
        {
          question: '¿Por qué debo introducir las deducciones de forma manual?',
          answer:
            'El salario neto real depende de la legislación fiscal de cada país, los tramos del impuesto sobre la renta, las cotizaciones a la seguridad social, el tipo de contrato y las deducciones personales. Para no mostrar cifras fiscales inexactas, tú introduces el importe de retención o deducción que se aplica a tu caso.',
        },
        {
          question: '¿Este resultado equivale a una nómina oficial?',
          answer:
            'No. Los valores mostrados son una estimación orientativa basada en las horas, días y deducciones introducidas, y no sustituyen el cálculo oficial de nómina de tu empleador o asesor laboral.',
        },
        {
          question: '¿Cómo influyen las horas por día y los días por semana?',
          answer:
            'Determinan el número total de días y horas trabajadas al año (por ejemplo, 8 h × 5 días × 52 semanas = 2.080 horas anuales), lo que permite convertir con exactitud entre sueldo anual/mensual y tarifa por hora o por día.',
        },
        {
          question: '¿En qué frecuencia debo escribir los ingresos adicionales y las deducciones?',
          answer:
            'Introdúcelos en la misma frecuencia que hayas elegido para el salario principal. Si elegiste frecuencia «Mensual», escribe los bonos y deducciones mensuales; si elegiste «Anual», escribe los importes anuales.',
        },
      ],
    },
    en: {
      slug: 'salary-calculator',
      url: '/en/tools/salary-calculator.html',
      name: 'Salary Calculator',
      shortDescription:
        'Convert your pay between hourly, daily, weekly, biweekly, monthly, and annual frequencies with optional bonuses and manual deductions.',
      seoTitle: 'International Salary Converter (Hourly to Annual) — CalculaFácil',
      metaDescription:
        'Convert salary across hourly, daily, weekly, biweekly, monthly, and annual pay periods using your working hours and days. Includes bonuses and manual deductions.',
      h1: 'Salary Calculator',
      introParagraph:
        'Accurately convert your compensation across hourly, daily, weekly, biweekly, monthly, and annual pay periods based on your actual working schedule. Add optional bonuses or supplemental income and enter manual deductions to see your estimated net pay for every timeframe.',
      instructionsTitle: 'How to use the salary calculator',
      instructions: [
        'Select your preferred display currency.',
        'Enter your base gross salary amount and select its payment frequency (hourly, daily, weekly, biweekly, monthly, or annual).',
        'Enter your standard working hours per day (e.g., 8) and working days per week (e.g., 5).',
        'Optionally enter additional income/bonuses and manual deductions (for the same payment frequency selected).',
        'Review the full breakdown of gross pay, bonuses, deductions, and estimated net pay across all six frequencies.',
      ],
      formulaTitle: 'Salary conversion formulas and assumptions',
      formulaBlock: [
        'Weeks per year = 52 | Biweekly periods per year = 26 | Months per year = 12',
        'Working days per year = Working days per week × 52',
        'Working hours per year = Working hours per day × Working days per week × 52',
        'Estimated Net Salary = Gross Salary + Additional Income − Manual Deductions',
      ],
      formulaExplanation:
        'Important tax note: This calculator never invents tax rates or claims automatic tax withholding for every country. Because actual take-home pay depends on national and local tax laws, social security contributions, benefits, and employer deductions, deductions are entered manually by you.',
      exampleTitle: 'Practical example',
      exampleText:
        'A monthly gross salary of 2,500.00 USD (working 8 hours/day, 5 days/week = 2,080 hours/year), plus 100.00 USD monthly bonus and 450.00 USD monthly manual deductions: equals 30,000.00 USD gross per year (14.42 USD gross/hour) and an estimated net salary of 2,150.00 USD per month (25,800.00 USD net per year).',
      faqs: [
        {
          question: 'Why are deductions entered manually instead of calculated automatically?',
          answer:
            'Income taxes, social contributions, health insurance, and pension deductions vary widely by country, region, filing status, and employer. Allowing you to enter your actual manual deductions prevents misleading or invented tax estimates.',
        },
        {
          question: 'Is the estimated net salary an official payroll result?',
          answer:
            'No. Estimated net salary is for personal planning only and is not an official payroll calculation or tax statement.',
        },
        {
          question: 'How do working hours per day and days per week affect the results?',
          answer:
            'They determine your total working days per year (days/week × 52) and total working hours per year (hours/day × days/week × 52), which are used to convert between hourly/daily rates and annual/monthly salaries.',
        },
        {
          question: 'What period should I use when entering bonuses and deductions?',
          answer:
            'Enter bonuses and manual deductions for the same frequency selected for your base salary (for example, if you selected Monthly salary, enter monthly bonuses and monthly deductions).',
        },
      ],
    },
  },
};

export const TOOL_LIST: ToolDefinition[] = [
  TOOLS_DATA['profit-margin'],
  TOOLS_DATA['selling-price'],
  TOOLS_DATA['break-even'],
  TOOLS_DATA['hourly-cost'],
  TOOLS_DATA['commission'],
  TOOLS_DATA['discount'],
  TOOLS_DATA['word-counter'],
  TOOLS_DATA['character-counter'],
  TOOLS_DATA['bank-loan'],
  TOOLS_DATA['salary'],
];
